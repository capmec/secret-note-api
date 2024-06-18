import * as crypto from 'crypto';
import * as dotenv from 'dotenv';
dotenv.config();

export class EncryptionService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly key: Buffer;
  private readonly iv: Buffer;

  constructor() {
    if (
      !process.env.ENCRYPTION_KEY ||
      process.env.ENCRYPTION_KEY.length !== 64
    ) {
      throw new Error(
        'Invalid ENCRYPTION_KEY length. It must be a 64-character hex string.',
      );
    }
    this.key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
    this.iv = Buffer.alloc(16, 0); // Initialization vector (IV)
  }

  encrypt(text: string): string {
    if (typeof text !== 'string') {
      throw new Error(
        'The "text" argument must be of type string. Received ' + typeof text,
      );
    }
    try {
      const cipher = crypto.createCipheriv(
        this.algorithm,
        Buffer.from(this.key),
        Buffer.from(this.iv),
      );
      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return encrypted;
    } catch (error) {
      console.error('Encryption error:', error);
      throw error; // Rethrow the error to handle it further up the call stack
    }
  }

  decrypt(text: string): string {
    try {
      const decipher = crypto.createDecipheriv(
        this.algorithm,
        this.key,
        this.iv,
      );
      let decrypted = decipher.update(text, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (error) {
      console.error('Decryption failed', error);
      throw new Error('Decryption failed');
    }
  }
}
