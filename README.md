# milestones.js


### Do this:

```
npm install -g nodeunit
node tests.js
```

### Usage:

```
let milestones = new Milestones();
milestones.register('m1', Promise.resolve(42));
milestones.register('m2', Promise.resolve(43));
milestones.when(['m1', 'm2']).then((values) => {
  test.equal(values[0], 42, 'm1 value is correct');
  test.equal(values[1], 43, 'm2 value is correct');
  test.done();
});
```
