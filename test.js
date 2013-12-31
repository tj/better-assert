
var assert = require('./');

describe('better-assert', function () {
  it('should pass', function () {
    assert(true == true);
  });

  it('should fail', function () {
    var err = false;
    try {
      assert(false == true);
    } catch (e) {
      err = e;
    }
    if (!err) throw new Error('didn\'t throw');
    assert.equal('false == true', err.message);
  });

  describe('.ok', function () {
    it('should be an alias of assert', function () {
      assert.strictEqual(assert, assert.ok);
    });
  });

  describe('.equal', function () {
    it('should pass', function () {
      assert.equal(1, 1);
    });

    it('should fail', function () {
      var err = false;
      try {
        assert.equal(1, false);
      } catch (e) {
        err = e;
      }
      if (!err) throw new Error('didn\'t throw');
      assert.equal('1 == false', err.message);
    });
  });

  describe('.notEqual', function () {
    it('should pass', function () {
      assert.notEqual(1, 2);
    });

    it('should fail', function () {
      var err = false;
      try {
        assert.notEqual(1, 1);
      } catch (e) {
        err = e;
      }
      if (!err) throw new Error('didn\'t throw');
      assert.equal('1 != 1', err.message);
    });
  });

  describe('.strictEqual', function () {
    it('should pass', function () {
      assert.strictEqual(1, 1);
    });

    it('should fail', function () {
      var err = false;
      try {
        assert.strictEqual(1, '1');
      } catch (e) {
        err = e;
      }
      if (!err) throw new Error('didn\'t throw');
      assert.equal('1 === \'1\'', err.message);
    });
  });

  describe('.notStrictEqual', function () {
    it('should pass', function () {
      assert.notStrictEqual(1, '1');
    });

    it('should fail', function () {
      var err = false;
      try {
        assert.notStrictEqual(1, 1);
      } catch (e) {
        err = e;
      }
      if (!err) throw new Error('didn\'t throw');
      assert.equal('1 !== 1', err.message);
    });
  });

  describe('.deepEqual', function () {
    it('should pass', function () {
      assert.deepEqual({ foo: 'bar' }, { foo: 'bar' });
    });

    it('should fail', function () {
      var err = false;
      try {
        var obj1 = { foo: 'bar' };
        var obj2 = { baz: 'qax' };
        assert.deepEqual(obj1, obj2);
      } catch (e) {
        err = e;
      }
      if (!err) throw new Error('didn\'t throw');
      assert.equal('obj1 deep equal obj2', err.message);
    });
  });

  describe('.notDeepEqual', function () {
    it('should pass', function () {
      assert.notDeepEqual({ foo: 'bar' }, { baz: 'qax' });
    });

    it('should fail', function () {
      var err = false;
      try {
        var obj1 = { foo: 'bar' };
        var obj2 = { foo: 'bar' };
        assert.notDeepEqual(obj1, obj2);
      } catch (e) {
        err = e;
      }
      if (!err) throw new Error('didn\'t throw');
      assert.equal('obj1 not deep equal obj2', err.message);
    });
  });

  describe('.ifError', function () {
    it('should pass', function () {
      assert.ifError(null);
    });
    it('should fail', function () {
      var err = false;
      try {
        assert.ifError(new Error);
      } catch (e) {
        err = e;
      }
      if (!err) throw new Error('didn\'t throw');
      assert.equal('new Error', err.message);
    });
  });

  describe('.throws', function () {
    it('should pass', function () {
      assert.throws(function () {
        throw new Error;
      }, Error);
    });
    it('should fail', function () {
      var err = false;
      try {
        assert.throws(function(){}, Error);
      } catch (e) {
        err = e;
      }
      if (!err) throw new Error('didn\'t throw');
    });
  });

  describe('.doesNotThrow', function () {
    it('should pass', function () {
      assert.doesNotThrow(function(){}, Error);
    });
    it('should fail', function () {
      var err = false;
      try {
        assert.doesNotThrow(function () {
          throw new Error;
        }, Error);
      } catch (e) {
        err = e;
      }
      if (!err) throw new Error('didn\'t throw');
    });
  });
});
