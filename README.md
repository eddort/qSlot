# QSlot component

## Examples
your component
```(jsx)
import { QSlot } from 'QSlot'

const Test = props => (
  <div>
    hello
    <QSlot
      select={byProps("props.slot")}
      to={Header}
      content={props.children}
    />
  </div>
);
```
call your component
```(jsx)
<Test>
  <div slot />
  <div slot />
</Test>
```
result
```(html)
<div>
  hello
  <div>
    <header>
      Test
    </header>
    <header>
      Test
    </header>
  </div>
</div>
```
