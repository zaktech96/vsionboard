# Vision Board Creator - Project Overview

## Core Features
- Create personalized vision boards
- Multiple layout options
- Dynamic image uploading
- Expandable grid systems
- Responsive design

## Layout Types
1. **Classic Grid**
   - Starts with 2x2 layout
   - Expandable with "Add More Images"
   - Consistent aspect ratio (4:3)

2. **Featured Focus**
   - Large hero image (21:9)
   - Supporting images (2:1)
   - Expandable supporting section

3. **Gallery Flow**
   - Unlimited image grid
   - Square aspect ratio
   - Responsive columns (2-4 based on screen size)

## Component Libraries Used
- **Lucide React Icons**: Used for UI elements
  ```typescript
  import { Plus } from "lucide-react"
  // <Plus /> renders a plus icon (+)
  // className props control size and color
  // Example: <Plus className="w-5 h-5 text-gray-400" />
  ```

- **Radix UI**: Used for accessible components
  - Dialog
  - VisuallyHidden
  - Other primitives

## Key Components
1. **Layout Selector**
   - Preview templates
   - Interactive selection
   - Visual feedback on hover/select

2. **Content Editor**
   - Image upload dialog
   - Dynamic grid management
   - Preview mode for empty states

3. **Board View**
   - Final rendered board
   - Download capability
   - Share functionality

## Styling Approach
- TailwindCSS for utility classes
- Consistent color scheme:
  ```css
  Primary: #FF1B7C (Pink)
  Hover: #FFE7F1 (Light Pink)
  Background: gray-50/gray-800 (Light/Dark mode)
  Border: gray-200/60 (Dashed)
  ```

## State Management
- Image storage in selectedImages object
- Layout type tracking
- Content type selection
- Dialog state management

## User Flow
1. Name board
2. Select template
3. Choose layout
4. Add/edit content
5. Preview and save
6. Share or download

## Accessibility Features
- Screen reader support
- Keyboard navigation
- ARIA labels
- Focus management

## Responsive Breakpoints
```css
sm: 640px  (2 columns)
md: 768px  (3 columns)
lg: 1024px (4 columns)
```

## Future Enhancements
- Drag and drop reordering
- More layout templates
- Image editing capabilities
- Collaborative boards
- Custom color themes

## Technical Notes
- Next.js 13+ app router
- TypeScript for type safety
- Server components where applicable
- Client-side image handling 