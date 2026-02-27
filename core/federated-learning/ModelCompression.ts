/**
 * Model Compression - Efficient model update transmission
 * Reduces communication overhead in federated learning
 */

export class ModelCompression {
  private compressionRatio: number;
  private quantizationBits: number;
  private sparsityThreshold: number;

  constructor(compressionRatio: number = 0.1, quantizationBits: number = 8, sparsityThreshold: number = 0.01) {
    this.compressionRatio = compressionRatio;
    this.quantizationBits = quantizationBits;
    this.sparsityThreshold = sparsityThreshold;
  }

  /**
   * Compress model weights for efficient transmission
   */
  async compress(weights: Float32Array): Promise<Float32Array> {
    // Apply multiple compression techniques
    let compressed = weights;
    
    // 1. Sparsification - remove small weights
    compressed = this.sparsify(compressed);
    
    // 2. Quantization - reduce precision
    compressed = this.quantize(compressed);
    
    // 3. Encoding - compress the data
    compressed = this.encode(compressed);
    
    return compressed;
  }

  /**
   * Decompress model weights
   */
  async decompress(compressedWeights: Float32Array): Promise<Float32Array> {
    // Reverse compression steps
    let decompressed = compressedWeights;
    
    // 1. Decode
    decompressed = this.decode(decompressed);
    
    // 2. Dequantize
    decompressed = this.dequantize(decompressed);
    
    // 3. Reconstruct sparse representation
    decompressed = this.reconstructSparse(decompressed);
    
    return decompressed;
  }

  /**
   * Get compression statistics
   */
  getCompressionStats(originalSize: number, compressedSize: number): CompressionStats {
    return {
      originalSize,
      compressedSize,
      compressionRatio: originalSize / compressedSize,
      spaceSaved: originalSize - compressedSize,
      spaceSavedPercentage: ((originalSize - compressedSize) / originalSize) * 100
    };
  }

  /**
   * Sparsification - remove weights below threshold
   */
  private sparsify(weights: Float32Array): Float32Array {
    const sparseWeights = [];
    const indices = [];
    
    for (let i = 0; i < weights.length; i++) {
      if (Math.abs(weights[i]) > this.sparsityThreshold) {
        sparseWeights.push(weights[i]);
        indices.push(i);
      }
    }
    
    // Store sparse representation as [index, value] pairs
    const sparseRepresentation = new Float32Array(sparseWeights.length * 2);
    for (let i = 0; i < sparseWeights.length; i++) {
      sparseRepresentation[i * 2] = indices[i];
      sparseRepresentation[i * 2 + 1] = sparseWeights[i];
    }
    
    return sparseRepresentation;
  }

  /**
   * Quantization - reduce precision of weights
   */
  private quantize(weights: Float32Array): Float32Array {
    const quantized = new Float32Array(weights.length);
    
    // Find min and max values for normalization
    let min = Infinity, max = -Infinity;
    for (let i = 0; i < weights.length; i++) {
      min = Math.min(min, weights[i]);
      max = Math.max(max, weights[i]);
    }
    
    const range = max - min;
    const levels = Math.pow(2, this.quantizationBits);
    
    for (let i = 0; i < weights.length; i++) {
      // Normalize to [0, 1]
      const normalized = (weights[i] - min) / range;
      
      // Quantize to discrete levels
      const quantizedLevel = Math.round(normalized * (levels - 1));
      
      // De-normalize back to original range
      quantized[i] = (quantizedLevel / (levels - 1)) * range + min;
    }
    
    return quantized;
  }

  /**
   * Encode compressed data
   */
  private encode(weights: Float32Array): Float32Array {
    // Simple run-length encoding for demonstration
    const encoded = [];
    let i = 0;
    
    while (i < weights.length) {
      let count = 1;
      const value = weights[i];
      
      // Count consecutive identical values
      while (i + count < weights.length && Math.abs(weights[i + count] - value) < 1e-6) {
        count++;
      }
      
      encoded.push(value);
      encoded.push(count);
      i += count;
    }
    
    return new Float32Array(encoded);
  }

  /**
   * Decode encoded data
   */
  private decode(encoded: Float32Array): Float32Array {
    const decoded = [];
    
    for (let i = 0; i < encoded.length; i += 2) {
      const value = encoded[i];
      const count = encoded[i + 1];
      
      for (let j = 0; j < count; j++) {
        decoded.push(value);
      }
    }
    
    return new Float32Array(decoded);
  }

  /**
   * Dequantize weights
   */
  private dequantize(quantizedWeights: Float32Array): Float32Array {
    // In practice, this would use the original min/max values
    // For now, return as-is since quantization is lossy but reversible within precision
    return quantizedWeights;
  }

  /**
   * Reconstruct sparse representation
   */
  private reconstructSparse(sparseWeights: Float32Array): Float32Array {
    // Estimate original size (this would be stored with the sparse representation)
    const originalSize = sparseWeights.length * 2; // Placeholder
    const reconstructed = new Float32Array(originalSize);
    
    // Fill with zeros
    for (let i = 0; i < reconstructed.length; i++) {
      reconstructed[i] = 0;
    }
    
    // Fill in non-zero values
    for (let i = 0; i < sparseWeights.length; i += 2) {
      const index = Math.floor(sparseWeights[i]);
      const value = sparseWeights[i + 1];
      if (index < reconstructed.length) {
        reconstructed[index] = value;
      }
    }
    
    return reconstructed;
  }

  /**
   * Adaptive compression based on network conditions
   */
  adaptCompression(networkLatency: number, bandwidth: number): void {
    if (networkLatency > 1000) { // High latency
      this.compressionRatio = 0.05; // More aggressive compression
      this.quantizationBits = 4; // Lower precision
    } else if (bandwidth < 1000000) { // Low bandwidth
      this.compressionRatio = 0.1;
      this.quantizationBits = 6;
    } else { // Good conditions
      this.compressionRatio = 0.2;
      this.quantizationBits = 8;
    }
  }

  /**
   * Estimate compression quality
   */
  estimateQuality(original: Float32Array, compressed: Float32Array): number {
    // Calculate mean squared error between original and decompressed
    let mse = 0;
    for (let i = 0; i < Math.min(original.length, compressed.length); i++) {
      const error = original[i] - compressed[i];
      mse += error * error;
    }
    
    mse /= Math.min(original.length, compressed.length);
    
    // Convert to quality score (0-1, higher is better)
    const maxMse = 1.0; // Maximum expected MSE
    const quality = Math.max(0, 1 - (mse / maxMse));
    
    return quality;
  }
}

export interface CompressionStats {
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  spaceSaved: number;
  spaceSavedPercentage: number;
}
