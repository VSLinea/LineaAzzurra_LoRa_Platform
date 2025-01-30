export const FEATURES = {
  MANAGEMENT_MODULE: false,  // Set to true to enable management features
} as const

export type FeatureFlag = keyof typeof FEATURES 