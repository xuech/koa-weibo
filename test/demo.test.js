/**
 * 
 */

function sum(a,b) {
   return a + b
}
test('tes demo', () => {
  const res = sum(2, 2)
  expect(res).toBe(4)
})