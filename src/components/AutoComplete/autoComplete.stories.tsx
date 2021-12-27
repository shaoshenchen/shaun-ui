import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import AutoComplete from "./autoComplete";


const products = [
  'MacBook Air', 'MacBook Pro', 'iMac', 'Mac Pro', 'Mac mini',
  'iPad Pro', 'iPad Air', 'iPad', 'iPad mini',
  'iPhone 13', 'iPhone 13 Pro', 'iPhone 13 Pro Max',
  'Apple Watch Serices 7', 'Apple Watch SE',
  'AirPods 第三代', 'AirPods Pro', 'AirPods Max'
]

const DefaultAutoComplete = () => (
  <AutoComplete options={products} onSelect={action('actions')} placeholder="Apple product querying" />
)

storiesOf('AutoComplete', module)
  .add('默认 AutoComplete', DefaultAutoComplete)