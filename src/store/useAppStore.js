import { create } from 'zustand'

// Shared state between the HTML sections and the 3D canvas.
// stage: 0 = hero, 1 = about, 2 = projects, 3 = experience, 4 = contact.
// Fractions mean "moving toward the next section".
export const useAppStore = create((set) => ({
  stage: 0,
  scrollProgress: 0,
  setStage: (stage) => set({ stage }),
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
}))
