import { createHash } from 'crypto';

export class HashUtil {
  static md5(str: string): string {
    return createHash('md5').update(str).digest('hex');
  }

  // 可选：添加其他哈希方法（如 SHA256）
  static sha256(str: string): string {
    return createHash('sha256').update(str).digest('hex');
  }
}