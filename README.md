# Tailwindify props

Converts component and object properties to Tailwind classes.

```sh
npm i tailwindify-props
```

To get types intellisense in your editor, you might need to add the following to your
`tsconfig.json`:

```json
"compilerOptions": {
	"moduleResolution": "Bundler"
}
```

## Basic usage

In your tailwind config, use the transform function so the classes generated by your props get
picked up by Tailwind and end up in your css output.

```js
import { svelte } from 'tailwindify-props/transform';

export default {
	content: {
		files: ['src/**/*.svelte'],
		transform: {
			svelte: svelte({
				replacers: {
					bg: 'bg-$value',
					text: 'text-$value',
					lineHeight: '6'
				}
			})
		}
	}
};
```

Then in your component, you can have props like this:

```svelte
<script>
	export let text = 'blue-500';
</script>

<button class="text-{text}"> My button </button>
```

To output:

```html
<button class="text-blue-500">My button</button>
```

```css
.text-blue-500 {
	color: blue;
}
```

You can now modify this prop from outside:

```svelte
<MyComponent text="red-800" />
```

```html
<button class="text-red-800">My button</button>
```

```css
.text-red-500 {
	color: red;
}
```

It also works with javascript/typescript objects and constants:

```svelte
<script lang="ts">
	type ButtonStyle = {
		bg: 'black' | 'red';
		text: 'white' | 'blue';
	};

	export let styles: ButtonStyle = {
		bg: 'black',
		text: 'white'
	};

	const lineHeight = '6';
</script>

<button class="bg-{styles.bg} text-{styles.text} leading-{lineHeight}"> My button </button>
```

```html
<button class="leading-6 bg-black text-white">My button</button>
```

```css
.bg-black {
	background-color: black;
}

.text-white {
	color: white;
}

.leading-6 {
	line-height: 1.5;
}
```

## The transform function

You can import transform functions from `tailwindify/transform`. The function has the name of the
file extension you want to transform. You can then use it in the `content.transform` property of
your Tailwind config.

Right now, only Svelte is supported.

```js
import { svelte } from 'tailwindify-props/transform';

export default {
	content: {
		files: ['src/**/*.svelte'],
		transform: {
			svelte: svelte()
		}
	}
};
```

The transform function accepts the following config object:

```ts
type Config = {
	replacers: {
		[key: string]: string | (value: string, prop: string) => string;
	};
	defaultScreen?: string;
	ignoredAttributes?: (string | RegExp)[];
};
```

### Replacers

Replacers correspond to the props you want to convert to Tailwind classes.

The key is the prop name.

The value can either be a string or a function that returns a string. This allows you to format the
resulting class however you like. The `'$value'` part of the string will be replaced with the actual
value.

By default, all props are converted to the format `'$prop-$value'`. Sometimes that's good, but
oftentimes this results in the wrong class name. For exemple, `borderColor` prop with a value of
`'red'` will generate the class `borderColor-red`. You can override this behavior by specifying a
replacer for `borderColor`.

```js
export default {
	content: {
		transform: {
			svelte: svelte({
				replacers: {
					borderColor: 'border-$value'
				}
			})
		}
	}
};
```

You can even use custom values and multiple classes for the same prop name.

```js
export default {
	content: {
		transform: {
			svelte: svelte({
				replacers: {
					size: 'w-[$value] h-[$value]'
				}
			})
		}
	}
};
```

If you need more customization, you can pass a function instead. The function receives the value and
the prop key as arguments and must return a string.

```js
export default {
	content: {
		transform: {
			svelte: svelte({
				replacers: {
					mySpecialProp: (value, prop) => {
						if (Number(value) > 5) {
							return `custom-${value}`;
						}
						return `${prop}_${value}`;
					}
				}
			})
		}
	}
};
```

### Responsive values

Passing a single value to our props is great, but what if you need responsive values?

You can chain multiple responsive values with the `|` separator and use your own Tailwind screen
prefixes.

```svelte
<MyButtonComponent padding="24|xs:32|lg:40" />
```

```html
<button class="p-24 xs:p-32 lg:p-40">Click me!</button>
```

If you find yourself often using the same screen prefix, you can omit it.

```svelte
<MyButtonComponent padding="24|32" />
```

```html
<button class="p-24 xs:p-32">Click me!</button>
```

The default screen prefix is `xs`, but you can customize it in your Tailwind config:

```js
export default {
	content: {
		transform: {
			svelte: svelte({
				defaultScreen: 'sm'
			})
		}
	}
};
```

### Ignored attributes

Since the `transform` functions rewrite the code to generate the classes, some attributes may want
to be ignored. The `class` attribute is always ignored by default, otherwise it would modify
perfectly valid classes and Tailwind would not identify them. You can add other attributes to
ignore, using either a string or a `RegExp`.

```js
export default {
	content: {
		transform: {
			svelte: svelte({
				ignoredAttributes: ['klass', 'className', /ignore/gi]
			})
		}
	}
};
```

## The tailwindify helper

Doing string interpolation to generate our classes isn't that complicated when you have simple
values. But a value like this is more difficult to parse:

```svelte
<MyComponent padding="24|28|sm:32|lg:40" />
```

To make this easier, you can use `tailwindify` to generate the classes.

```ts
type Tailwindify = (
	classPrefix: string | string[],
	values: string,
	defaultScreen: string
) => string;
```

```svelte
<script>
import { tailwindify } from 'tailwindify-props';

export let padding = '24|28|sm:32|lg:40';
</script>

<div class="{tailwindify('p', padding)}"></div>
```

```html
<div class="p-24 xs:p-28 sm:p-32 lg:p-40"></div>
```

You can generate multiple classes in the same function call:

```svelte
<script>
import { tailwindify } from 'tailwindify-props';

export let size = '24|40';
</script>

<div class="{tailwindify(['w', 'h'], size)}"></div>
```

```html
<div class="w-24 h-24 xs:w-40 xs:h-40"></div>
```

You can also specify a different default screen:

```svelte
<script>
import { tailwindify } from 'tailwindify-props';

export let size = '24|40';
</script>

<div class="{tailwindify(['w', 'h'], size, 'sm')}"></div>
```

```html
<div class="w-24 h-24 sm:w-40 sm:h-40"></div>
```

An additional benefit of using `tailwindify` is that you might not need to specify any replacers at
all. The transform function will parse the code for any `tailwindify` calls and automatically
generate replacers based on the arguments. For example, this code

```svelte
<script>
import { tailwindify } from 'tailwindify-props';

export let size = '24|40';

const sizeClasses = tailwindify(['w', 'h'], size);
</script>
```

will generate the replacer

```ts
{
	size: 'w-$value h-$value';
}
```

and the classes `'w-24 xs:w-40 h-24 xs:h-40'`.

If this format doesn't suit your needs, you can always specify a replacer for that prop and it will
override the default.
