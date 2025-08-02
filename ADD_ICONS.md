# How to Add Your Custom Icons

## Quick Guide

### 1. Create Your Icon Component

Create a new React component for your icon. Example:

```jsx
// src/icons/MyCustomIcon.jsx
export const MyCustomIcon = ({
  className,
  width = 32,
  height = 32,
  stroke = "#6366f1",
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Your SVG path data here */}
      <path d="M16 2L2 7l14 5 14-5-14-5z" />
      <path d="M2 17l14 5 14-5" />
      <path d="M2 12l14 5 14-5" />
    </svg>
  );
};
```

### 2. Add to the Icons Array

In `src/App.jsx`, add your icon to the `customIcons` array:

```jsx
const customIcons = [
  {
    id: 1,
    name: "ProfileIcon",
    component: ProfileIcon,
    description: "A personalized profile icon with customizable initials",
    category: "personal",
    color: "#6366f1",
    tags: ["profile", "user", "avatar", "customizable"],
  },
  // Add your new icon here
  {
    id: 2,
    name: "MyCustomIcon",
    component: MyCustomIcon,
    description: "Your icon description here",
    category: "your-category",
    color: "#your-color",
    tags: ["tag1", "tag2", "tag3"],
  },
];
```

### 3. Import Your Component

Add the import at the top of `src/App.jsx`:

```jsx
import { MyCustomIcon } from "./icons/MyCustomIcon";
```

## Icon Structure

Each icon should have:

- **id**: Unique identifier
- **name**: Display name
- **component**: Your React component
- **description**: Brief description
- **category**: Icon category
- **color**: Default color
- **tags**: Array of searchable tags

## Tips

1. Use consistent viewBox (0 0 32 32) for all icons
2. Accept width, height, stroke, and className props
3. Use stroke="currentColor" for color inheritance
4. Add descriptive tags for better searchability
5. Choose colors that match your design theme

## Example Icon

```jsx
export const StarIcon = ({
  className,
  width = 32,
  height = 32,
  stroke = "#f59e0b",
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <polygon points="16 2 20.09 12.26 32 14.27 24 22.14 25.18 32.02 16 26.77 6.82 32.02 8 22.14 0 14.27 11.91 12.26 16 2" />
    </svg>
  );
};
```

Then add to the array:

```jsx
{
  id: 3,
  name: "StarIcon",
  component: StarIcon,
  description: "A beautiful star icon with customizable color",
  category: "symbols",
  color: "#f59e0b",
  tags: ["star", "symbol", "rating", "favorite"],
}
```

That's it! Your icon will appear in the gallery with all the animations and features.
