import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock fetch API for tests
globalThis.fetch = vi.fn();

// Mock window.open for map functionality
window.open = vi.fn();
