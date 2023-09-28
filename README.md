react-hoverinfo
=====================

It's React wrapper component which support tooltip


## Install

```sh
npm install react-hoverinfo
```

## Usage

Import `react-hoverinfo` after installation.

```javascript
import React, { useState } from 'react';
import { Tooltip } from "react-hoverinfo";

function App() {
  const [html, setHtml] = useState("")
  return (
    <>
      <Tooltip id="main" />
    </>
  );
}

export default App;

```

Add `data-tooltip-id="<tooltip id>"` and `data-tooltip-content="<your placeholder>"` to your element.

```javascript
import React, { useState } from 'react';

function Child() {
  return (
    <>
      <button data-tooltip-id="main" data-tooltip-content={"Notification"}>
        Button 1
      </button>
    </>
  );
}

export default App;

```

## Available props
|prop|description|type|
|--|----|----|
|id|**required:** this is is used to detect the target element|String|
|className|you can add your className|String|

## Support
If you are facing any issue, please contact [via linkedin ( Libin Prasanth )](https://www.linkedin.com/in/libinprasanth/).

## Examples

Do you want to try **react-hoverinfo** before use ?

[Example](https://codesandbox.io/s/react-hoverinfo-v9f68x)

## Donate!
Like my Work! [Donate](https://www.paypal.me/LibinPrasanth) 