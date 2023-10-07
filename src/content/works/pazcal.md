---
title: 'Pazcal'
createdAt: 2020/2/27
description: "パズドラの経験値計算機ツール"
---


## This is a header

This is a paragraph. The graph is an `svg` element. And the [rounded indicator](https://monica-dev.com) itself has offset-path defined with the same path definition that renders the graph stroke. Basically, this property enables moving an element along a given path. For brevity, some details are omitted but here is the general idea:

This is a list

- item 1
- item 2
  - item 2.1
    - item 2.2
- item 3

This is a table

| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

This is a link

[Link](https://google.com)

[Internal link](/blog/markdownacopy)

This is an image

![Image](/images/works/pazcal/hero.png)

This is a blockquote

> This is a blockquote

This is a horizontal rule

---

This is a code block

```jsx title="This is a code block" {2,10-13}
import React from 'react';
import { z } from 'zod';

const schema = z.object({
  name: z.string(),
  age: z.number().positive(),
});

const Component = () => {
  const [state, setState] = React.useState({
    name: '',
    age: 0,
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = schema.safeParse(state);

    if (result.success) {
      console.log(result.data);
    } else {
      console.log(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={state.name} onChange={handleChange} />
      <input type="number" name="age" value={state.age} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Component;
```

This is a task list

- [x] Task 1
  - [ ] Task 2
    - [x] Task 2.1
- [ ] Task 3

This is a footnote

This is a paragraph with a footnote[^1]

[^1]: This is a footnote

This is mdx content
