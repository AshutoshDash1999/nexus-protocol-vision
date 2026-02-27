/**
 * Secure Communication - Encrypted and authenticated messaging
 * Provides secure channels for agent-to-agent communication
 */

export interface SecureMessage {
  id: string;
  senderId: string;
  recipientId: string;
  encryptedContent: string;
  signature: string;
  timestamp: number;
  metadata: {
    messageType: string;
    urgency: 'low' | 'medium' | 'high';
    encryptionLevel: 'standard' | 'military' | 'quantum';
    ttl?: number; // Time to live
  };
}

export interface CommunicationChannel {
  channelId: string;
  participants: string[];
  encryptionKey: string;
  establishedAt: number;
  lastActivity: number;
  metadata: {
    channelType: 'direct' | 'group' | 'broadcast';
    persistence: 'ephemeral' | 'persistent' | 'archived';
  };
}

export interface MessageDelivery {
  messageId: string;
  status: 'pending' | 'delivered' | 'read' | 'failed';
  timestamp: number;
  error?: string;
}

export class SecureCommunication {
  private activeChannels: Map<string, CommunicationChannel> = new Map();
  private messageQueue: Map<string, SecureMessage[]> = new Map();
  private cryptoProvider: CryptographicProvider;
  private identityManager: IdentityManager;

  constructor() {
    this.cryptoProvider = new CryptographicProvider();
    this.identityManager = new IdentityManager();
  }

  /**
   * Establish secure communication channel
   */
  async establishChannel(
    participantIds: string[],
    channelType: 'direct' | 'group' | 'broadcast' = 'direct'
  ): Promise<CommunicationChannel> {
    const channelId = this.generateChannelId();
    
    // Generate shared encryption key
    const encryptionKey = await this.generateSharedKey(participantIds);
    
    // Create channel
    const channel: CommunicationChannel = {
      channelId,
      participants: participantIds,
      encryptionKey,
      establishedAt: Date.now(),
      lastActivity: Date.now(),
      metadata: {
        channelType,
        persistence: channelType === 'broadcast' ? 'ephemeral' : 'persistent'
      }
    };
    
    this.activeChannels.set(channelId, channel);
    this.messageQueue.set(channelId, []);
    
    // Notify participants of channel establishment
    await this.notifyChannelEstablishment(channel);
    
    return channel;
  }

  /**
   * Send secure message
   */
  async sendMessage(
    channelId: string,
    senderId: string,
    content: any,
    options: MessageOptions = {}
  ): Promise<string> {
    const channel = this.activeChannels.get(channelId);
    if (!channel) {
      throw new Error('Channel not found');
    }
    
    // Verify sender is channel participant
    if (!channel.participants.includes(senderId)) {
      throw new Error('Sender not authorized for this channel');
    }
    
    // Encrypt message content
    const encryptedContent = await this.encryptContent(content, channel.encryptionKey);
    
    // Sign message
    const signature = await this.signMessage(senderId, encryptedContent);
    
    // Create secure message
    const message: SecureMessage = {
      id: this.generateMessageId(),
      senderId,
      recipientId: options.recipientId || 'broadcast',
      encryptedContent,
      signature,
      timestamp: Date.now(),
      metadata: {
        messageType: options.messageType || 'general',
        urgency: options.urgency || 'medium',
        encryptionLevel: options.encryptionLevel || 'standard',
        ttl: options.ttl
      }
    };
    
    // Add to message queue
    const queue = this.messageQueue.get(channelId);
    if (queue) {
      queue.push(message);
    }
    
    // Deliver message
    await this.deliverMessage(channel, message);
    
    // Update channel activity
    channel.lastActivity = Date.now();
    
    return message.id;
  }

  /**
   * Receive and decrypt message
   */
  async receiveMessage(
    channelId: string,
    recipientId: string,
    messageId: string
  ): Promise<any> {
    const channel = this.activeChannels.get(channelId);
    if (!channel) {
      throw new Error('Channel not found');
    }
    
    // Verify recipient is channel participant
    if (!channel.participants.includes(recipientId)) {
      throw new Error('Recipient not authorized for this channel');
    }
    
    // Find message in queue
    const queue = this.messageQueue.get(channelId);
    if (!queue) {
      throw new Error('Message queue not found');
    }
    
    const message = queue.find(msg => msg.id === messageId);
    if (!message) {
      throw new Error('Message not found');
    }
    
    // Verify message signature
    const signatureValid = await this.verifySignature(
      message.senderId,
      message.encryptedContent,
      message.signature
    );
    
    if (!signatureValid) {
      throw new Error('Invalid message signature');
    }
    
    // Check TTL
    if (message.metadata.ttl && Date.now() > message.timestamp + message.metadata.ttl) {
      throw new Error('Message expired');
    }
    
    // Decrypt message content
    const decryptedContent = await this.decryptContent(
      message.encryptedContent,
      channel.encryptionKey
    );
    
    return decryptedContent;
  }

  /**
   * Close communication channel
   */
  async closeChannel(channelId: string, requesterId: string): Promise<void> {
    const channel = this.activeChannels.get(channelId);
    if (!channel) {
      throw new Error('Channel not found');
    }
    
    // Verify requester is channel participant
    if (!channel.participants.includes(requesterId)) {
      throw new Error('Not authorized to close this channel');
    }
    
    // Notify participants of channel closure
    await this.notifyChannelClosure(channel);
    
    // Clean up
    this.activeChannels.delete(channelId);
    this.messageQueue.delete(channelId);
  }

  /**
   * Get channel status and statistics
   */
  getChannelStatus(channelId: string): ChannelStatus | null {
    const channel = this.activeChannels.get(channelId);
    if (!channel) {
      return null;
    }
    
    const queue = this.messageQueue.get(channelId) || [];
    
    return {
      channelId,
      participants: channel.participants,
      establishedAt: channel.establishedAt,
      lastActivity: channel.lastActivity,
      messageCount: queue.length,
      channelType: channel.metadata.channelType,
      persistence: channel.metadata.persistence,
      uptime: Date.now() - channel.establishedAt
    };
  }

  /**
   * Get all active channels for a participant
   */
  getParticipantChannels(participantId: string): CommunicationChannel[] {
    return Array.from(this.activeChannels.values()).filter(channel =>
      channel.participants.includes(participantId)
    );
  }

  /**
   * Generate shared encryption key for participants
   */
  private async generateSharedKey(participantIds: string[]): Promise<string> {
    // In practice, this would use Diffie-Hellman key exchange
    // For demonstration, we'll generate a simple shared key
    const keyMaterial = participantIds.join('_') + Date.now();
    return await this.cryptoProvider.hash(keyMaterial);
  }

  /**
   * Encrypt message content
   */
  private async encryptContent(content: any, encryptionKey: string): Promise<string> {
    const contentString = JSON.stringify(content);
    return await this.cryptoProvider.encrypt(contentString, encryptionKey);
  }

  /**
   * Decrypt message content
   */
  private async decryptContent(encryptedContent: string, encryptionKey: string): Promise<any> {
    const decryptedString = await this.cryptoProvider.decrypt(encryptedContent, encryptionKey);
    return JSON.parse(decryptedString);
  }

  /**
   * Sign message with sender's private key
   */
  private async signMessage(senderId: string, content: string): Promise<string> {
    const privateKey = await this.identityManager.getPrivateKey(senderId);
    return await this.cryptoProvider.sign(content, privateKey);
  }

  /**
   * Verify message signature
   */
  private async verifySignature(senderId: string, content: string, signature: string): Promise<boolean> {
    const publicKey = await this.identityManager.getPublicKey(senderId);
    return await this.cryptoProvider.verify(content, signature, publicKey);
  }

  /**
   * Deliver message to recipients
   */
  private async deliverMessage(channel: CommunicationChannel, message: SecureMessage): Promise<void> {
    // In practice, this would use a message delivery system
    // For demonstration, we'll simulate delivery
    
    const recipients = message.recipientId === 'broadcast' 
      ? channel.participants.filter(p => p !== message.senderId)
      : [message.recipientId];
    
    for (const recipient of recipients) {
      // Simulate delivery delay
      await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
      
      // In practice, this would push to recipient's message queue
      console.log(`Message delivered to ${recipient}: ${message.id}`);
    }
  }

  /**
   * Notify participants of channel establishment
   */
  private async notifyChannelEstablishment(channel: CommunicationChannel): Promise<void> {
    const notification = {
      type: 'channel_established',
      channelId: channel.channelId,
      participants: channel.participants,
      timestamp: channel.establishedAt
    };
    
    // Send notification to all participants
    for (const participant of channel.participants) {
      console.log(`Channel establishment notification sent to ${participant}`);
    }
  }

  /**
   * Notify participants of channel closure
   */
  private async notifyChannelClosure(channel: CommunicationChannel): Promise<void> {
    const notification = {
      type: 'channel_closed',
      channelId: channel.channelId,
      participants: channel.participants,
      timestamp: Date.now()
    };
    
    // Send notification to all participants
    for (const participant of channel.participants) {
      console.log(`Channel closure notification sent to ${participant}`);
    }
  }

  private generateChannelId(): string {
    return `channel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export interface MessageOptions {
  recipientId?: string;
  messageType?: string;
  urgency?: 'low' | 'medium' | 'high';
  encryptionLevel?: 'standard' | 'military' | 'quantum';
  ttl?: number;
}

export interface ChannelStatus {
  channelId: string;
  participants: string[];
  establishedAt: number;
  lastActivity: number;
  messageCount: number;
  channelType: 'direct' | 'group' | 'broadcast';
  persistence: 'ephemeral' | 'persistent' | 'archived';
  uptime: number;
}

class CryptographicProvider {
  async encrypt(data: string, key: string): Promise<string> {
    // In practice, use AES or other strong encryption
    // For demonstration, simple XOR encryption
    let encrypted = '';
    for (let i = 0; i < data.length; i++) {
      encrypted += String.fromCharCode(
        data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return btoa(encrypted); // Base64 encode
  }

  async decrypt(encryptedData: string, key: string): Promise<string> {
    // In practice, use AES or other strong decryption
    // For demonstration, simple XOR decryption
    const data = atob(encryptedData); // Base64 decode
    let decrypted = '';
    for (let i = 0; i < data.length; i++) {
      decrypted += String.fromCharCode(
        data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return decrypted;
  }

  async sign(data: string, privateKey: string): Promise<string> {
    // In practice, use RSA or ECDSA signatures
    // For demonstration, simple hash-based signature
    const hash = await this.hash(data + privateKey);
    return `sig_${hash}`;
  }

  async verify(data: string, signature: string, publicKey: string): Promise<boolean> {
    // In practice, use RSA or ECDSA verification
    // For demonstration, simple hash verification
    const expectedHash = await this.hash(data + publicKey);
    return signature === `sig_${expectedHash}`;
  }

  async hash(data: string): Promise<string> {
    // Simple hash function for demonstration
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }
}

class IdentityManager {
  private keyPairs: Map<string, { publicKey: string; privateKey: string }> = new Map();

  async getPrivateKey(identityId: string): Promise<string> {
    let keyPair = this.keyPairs.get(identityId);
    if (!keyPair) {
      keyPair = await this.generateKeyPair();
      this.keyPairs.set(identityId, keyPair);
    }
    return keyPair.privateKey;
  }

  async getPublicKey(identityId: string): Promise<string> {
    let keyPair = this.keyPairs.get(identityId);
    if (!keyPair) {
      keyPair = await this.generateKeyPair();
      this.keyPairs.set(identityId, keyPair);
    }
    return keyPair.publicKey;
  }

  private async generateKeyPair(): Promise<{ publicKey: string; privateKey: string }> {
    // In practice, use proper cryptographic key generation
    const privateKey = `priv_${Date.now()}_${Math.random().toString(36)}`;
    const publicKey = `pub_${Date.now()}_${Math.random().toString(36)}`;
    return { publicKey, privateKey };
  }
}
