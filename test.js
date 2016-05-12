'use strict';

const Milestones = require('./milestones');

exports.testSingle = function(test) {
	let milestones = new Milestones();
	milestones.register('m1', Promise.resolve(42));
	milestones.when('m1').then((m1Value) => {
		test.equal(m1Value, 42, 'm1 value is correct');
    test.done();
	});
};

exports.testWhenBeforeRegister = function(test) {
  let milestones = new Milestones();
  milestones.when('m1').then((m1Value) => {
    test.equal(m1Value, 42, 'm1 value is correct');
    test.done();
  });
  milestones.register('m1', Promise.resolve(42));
};

exports.testMultiple = function(test) {
  let milestones = new Milestones();
  milestones.register('m1', Promise.resolve(42));
  milestones.register('m2', Promise.resolve(43));
  milestones.when('m1', 'm2').then((values) => {
    test.equal(values[0], 42, 'm1 value is correct');
    test.equal(values[1], 43, 'm2 value is correct');
    test.done();
  });
};

exports.testMultipleWhenBeforeRegister = function(test) {
  let milestones = new Milestones();
  milestones.when('m1', 'm2').then((values) => {
    test.equal(values[0], 42, 'm1 value is correct');
    test.equal(values[1], 43, 'm2 value is correct');
    test.done();
  });
  milestones.register('m1', Promise.resolve(42));
  milestones.register('m2', Promise.resolve(43));
};

exports.testWhenInbetweenRegisters = function(test) {
  let milestones = new Milestones();
  milestones.register('m1', Promise.resolve(42));
  milestones.when('m1', 'm2').then((values) => {
    test.equal(values[0], 42, 'm1 value is correct');
    test.equal(values[1], 43, 'm2 value is correct');
    test.done();
  });
  milestones.register('m2', Promise.resolve(43));
};

exports.testSingleReject = function(test) {
  let milestones = new Milestones();
  milestones.when('m1').then(() => {
    test.ok(false, 'Rejected milestone did not resolve');
    test.done();
  }).catch((m1Reject) => {
    test.equal(m1Reject, 42, 'm1 correct reject value');
    test.done();
  });
  milestones.register('m1', Promise.reject(42));
};

exports.testSingleRejectBeforeWhen = function(test) {
  let milestones = new Milestones();
  milestones.register('m1', Promise.reject(42));
  milestones.when('m1').then(() => {
    test.ok(false, 'Rejected milestone did not resolve');
    test.done();
  }).catch((m1Reject) => {
    test.equal(m1Reject, 42, 'm1 correct reject value');
    test.done();
  });
};

exports.testMultipleReject = function(test) {
  let milestones = new Milestones();
  milestones.when('m1', 'm2').then(() => {
    test.ok(false, 'Rejected milestone did not resolve');
    test.done();
  }).catch((m1Reject) => {
    test.equal(m1Reject, 42, 'm1 correct reject value');
    test.done();
  });
  milestones.register('m1', Promise.reject(42));
  milestones.register('m2', Promise.reject(43));
};

exports.testMultipleReject2 = function(test) {
  let milestones = new Milestones();
  milestones.when('m1', 'm2').then(() => {
    test.ok(false, 'Rejected milestone did not resolve');
    test.done();
  }).catch((m1Reject) => {
    test.equal(m1Reject, 43, 'm1 correct reject value');
    test.done();
  });
  milestones.register('m2', Promise.reject(43));
  milestones.register('m1', Promise.reject(42));
};

exports.testMultipleReject3 = function(test) {
  let milestones = new Milestones();
  milestones.register('m1', Promise.reject(42));
  milestones.when('m2', 'm1').then(() => {
    test.ok(false, 'Rejected milestone did not resolve');
    test.done();
  }).catch((m1Reject) => {
    test.equal(m1Reject, 42, 'm1 correct reject value');
    test.done();
  });
  milestones.register('m2', Promise.reject(43));
};

exports.testDuplicateRegister = function(test) {
  let milestones = new Milestones();
  let milestone = milestones.register('m1', Promise.resolve(42));
  test.throws(() => {
    milestones.register('m1', Promise.resolve(43));
  }, 'Duplicate register throws an exception');
  test.throws(() => {
    milestone.link(Promise.resolve(43));
  }, 'Duplicate register throws an exception');
  test.done();
};
