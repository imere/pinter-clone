describe('App.vue', function () {

  it('[1, 2] not to be [1, 2]', function () {
    expect([1, 2]).not.toBe([1, 2])
  })
  it('{ a: 1 } not to be { a: 2 }', function () {
    expect({ a: 1 }).not.toBe({ a: 2 })
  })
})
