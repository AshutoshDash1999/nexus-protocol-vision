/**
 * Differential Privacy - Privacy-preserving machine learning
 * Adds calibrated noise to protect individual privacy
 */

export class DifferentialPrivacy {
  private privacyBudget: number;
  private budgetUsed: number = 0;
  private sensitivity: number;
  private noiseScale: number;

  constructor(privacyBudget: number, sensitivity: number = 1.0) {
    this.privacyBudget = privacyBudget;
    this.sensitivity = sensitivity;
    this.noiseScale = this.calculateNoiseScale();
  }

  /**
   * Add Laplace noise to gradients for differential privacy
   */
  async addNoise(gradients: Float32Array): Promise<Float32Array> {
    const noisyGradients = new Float32Array(gradients.length);
    
    for (let i = 0; i < gradients.length; i++) {
      const noise = this.sampleLaplace(0, this.noiseScale);
      noisyGradients[i] = gradients[i] + noise;
    }
    
    // Update budget used
    this.budgetUsed += this.calculatePrivacyCost(gradients.length);
    
    return noisyGradients;
  }

  /**
   * Clip gradients to limit privacy loss
   */
  clipGradients(gradients: Float32Array, clippingNorm: number = 1.0): Float32Array {
    const norm = this.calculateNorm(gradients);
    
    if (norm <= clippingNorm) {
      return gradients;
    }
    
    const scalingFactor = clippingNorm / norm;
    const clippedGradients = new Float32Array(gradients.length);
    
    for (let i = 0; i < gradients.length; i++) {
      clippedGradients[i] = gradients[i] * scalingFactor;
    }
    
    return clippedGradients;
  }

  /**
   * Get remaining privacy budget
   */
  getRemainingBudget(): number {
    return Math.max(0, this.privacyBudget - this.budgetUsed);
  }

  /**
   * Get budget used so far
   */
  getBudgetUsed(): number {
    return this.budgetUsed;
  }

  /**
   * Reset privacy budget
   */
  resetBudget(): void {
    this.budgetUsed = 0;
  }

  /**
   * Check if we have enough budget for operation
   */
  hasBudgetFor(dataSize: number): boolean {
    const cost = this.calculatePrivacyCost(dataSize);
    return this.budgetUsed + cost <= this.privacyBudget;
  }

  private calculateNoiseScale(): number {
    // Laplace mechanism: scale = sensitivity / epsilon
    return this.sensitivity / this.privacyBudget;
  }

  private sampleLaplace(mean: number, scale: number): number {
    // Sample from Laplace distribution
    const uniform = Math.random() - 0.5;
    return mean - scale * Math.sign(uniform) * Math.log(1 - 2 * Math.abs(uniform));
  }

  private calculateNorm(vector: Float32Array): number {
    let sumSquares = 0;
    for (let i = 0; i < vector.length; i++) {
      sumSquares += vector[i] * vector[i];
    }
    return Math.sqrt(sumSquares);
  }

  private calculatePrivacyCost(dataSize: number): number {
    // Simple privacy cost calculation
    // In practice, this would use more sophisticated composition theorems
    return (dataSize * this.sensitivity) / this.privacyBudget;
  }
}
