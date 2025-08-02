# React Animated Icon Library

A beautifully crafted collection of animated, SVG-based React icons powered by **Framer Motion**. Built for modern UI/UX needs — fully customizable and plug-and-play.

- LIVE : https://icon-collection.netlify.app/
---

## Folder Structure

All icons live inside the `assets/icons/` folder:

```

assets/
└── icons/
├── HomeIcon.jsx
├── ProfileIcon.jsx
└── ...

```

Each icon is a **self-contained React component** using `framer-motion` for smooth animations.

---

## Requirements

Before using these icons, make sure your project meets the following requirements:

### Install Framer Motion

```bash
npm install framer-motion
```

> React v17 or higher is recommended.

---

## Usage Guide

### 1. Copy an Icon File

Choose any icon from `assets/icons/`, like `HomeIcon.jsx`, and copy it into your React project.

For example:

```bash
your-app/
└── src/
    └── components/
        └── HomeIcon.jsx   ← paste it here
```

---

### 2.Import and Use

```jsx
import { HomeIcon } from "./components/HomeIcon";

function App() {
  return (
    <div style={{ backgroundColor: "#111", padding: "40px" }}>
      <HomeIcon
        label="Home"
        href="/"
        stroke="#ffffff"
        accentColor="#6366f1"
        fillColor="#6366f120"
        glowEffect={true}
      />
    </div>
  );
}
```

---

## Props Reference

| Prop            | Type              | Default       | Description                               |
| --------------- | ----------------- | ------------- | ----------------------------------------- |
| `width`         | `number`          | `28`          | Icon width in px                          |
| `height`        | `number`          | `28`          | Icon height in px                         |
| `stroke`        | `string`          | `#ffffff`     | Stroke line color                         |
| `accentColor`   | `string`          | `#6366f1`     | Gradient and glow accent                  |
| `fillColor`     | `string`          | `transparent` | Inside fill color                         |
| `strokeWidth`   | `number`          | `2`           | Outline thickness                         |
| `label`         | `string`          | `null`        | Text shown next to icon                   |
| `labelColor`    | `string`          | `stroke`      | Label text color                          |
| `labelSize`     | `number`          | `14`          | Label font size                           |
| `labelWeight`   | `number`          | `500`         | Label font weight                         |
| `glowEffect`    | `boolean`         | `true`        | Toggle glow effect                        |
| `href`          | `string`          | `null`        | Render as `<a href>`                      |
| `onClick`       | `function`        | `null`        | Custom click handler                      |
| `LinkComponent` | `React.Component` | `null`        | Pass custom `<Link>` (e.g., React Router) |
| `linkProps`     | `object`          | `{}`          | Props for custom link component           |

---

## Example Usages

### ➤ Default Anchor Link

```jsx
<HomeIcon href="/" label="Home" accentColor="#6366f1" />
```

### ➤ Custom Click Handler

```jsx
<HomeIcon onClick={() => console.log("Clicked Home!")} label="Dashboard" />
```

### ➤ React Router Link

```jsx
import { Link } from "react-router-dom";

<HomeIcon LinkComponent={Link} linkProps={{ to: "/" }} label="Welcome" />;
```

---

## Dependency

```bash
npm install framer-motion
```

---

## Contribute

Want to submit a new animated icon?

1. Create a new file inside `assets/icons/`
2. Export a single named component (e.g., `SettingsIcon`)
3. Use `framer-motion` for animations
4. Submit a Pull Request!

---

## License

MIT License
Use freely in personal and commercial projects.

---

##Tip

You can use this icon system for:

- Portfolios
- Dashboards
- Smart home UIs
- E-commerce panels
- Developer toolbars
  > NOTE: Every icon components includes a usage snippet as a comment at the bottom of the components.

---

## 🌐 Update

- Regularly adding new icons

---

