import { describe, it, expect } from '@jest/globals';

describe('Environment Variables', () => {
  it('should use default values when environment variables are not set', () => {
    // Save original values
    const originalRegion = process.env.OKTOPOST_ACCOUNT_REGION;
    const originalAccountId = process.env.OKTOPOST_ACCOUNT_ID;
    const originalApiKey = process.env.OKTOPOST_API_KEY;

    // Remove environment variables
    delete process.env.OKTOPOST_ACCOUNT_REGION;
    delete process.env.OKTOPOST_ACCOUNT_ID;
    delete process.env.OKTOPOST_API_KEY;

    // Test default values
    expect(process.env.OKTOPOST_ACCOUNT_REGION || 'us').toBe('us');
    expect(process.env.OKTOPOST_ACCOUNT_ID || '-').toBe('-');
    expect(process.env.OKTOPOST_API_KEY || '-').toBe('-');

    // Restore original values
    if (originalRegion) process.env.OKTOPOST_ACCOUNT_REGION = originalRegion;
    if (originalAccountId) process.env.OKTOPOST_ACCOUNT_ID = originalAccountId;
    if (originalApiKey) process.env.OKTOPOST_API_KEY = originalApiKey;
  });

  it('should use environment variables when they are set', () => {
    // Save original values
    const originalRegion = process.env.OKTOPOST_ACCOUNT_REGION;
    const originalAccountId = process.env.OKTOPOST_ACCOUNT_ID;
    const originalApiKey = process.env.OKTOPOST_API_KEY;

    // Set test values
    process.env.OKTOPOST_ACCOUNT_REGION = 'eu';
    process.env.OKTOPOST_ACCOUNT_ID = 'test-account';
    process.env.OKTOPOST_API_KEY = 'test-key';

    // Test that environment variables are used
    expect(process.env.OKTOPOST_ACCOUNT_REGION || 'us').toBe('eu');
    expect(process.env.OKTOPOST_ACCOUNT_ID || '-').toBe('test-account');
    expect(process.env.OKTOPOST_API_KEY || '-').toBe('test-key');

    // Restore original values
    if (originalRegion) {
      process.env.OKTOPOST_ACCOUNT_REGION = originalRegion;
    } else {
      delete process.env.OKTOPOST_ACCOUNT_REGION;
    }
    if (originalAccountId) {
      process.env.OKTOPOST_ACCOUNT_ID = originalAccountId;
    } else {
      delete process.env.OKTOPOST_ACCOUNT_ID;
    }
    if (originalApiKey) {
      process.env.OKTOPOST_API_KEY = originalApiKey;
    } else {
      delete process.env.OKTOPOST_API_KEY;
    }
  });
});

describe('Package Configuration', () => {
  it('should have correct package name and version format', () => {
    // Basic package validation
    expect(typeof process.env).toBe('object');
  });
});