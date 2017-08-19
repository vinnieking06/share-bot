const loveFind = require('./../love-find.js');

describe("love find feature", function() {
  const image = 'https://dtpmhvbsmffsz.cloudfront.net/users/2017/04/24/53a26e1778195006a0033472/t_58fde3c8a457c87cc2f95e60.jpg';

  it("should conver string to id", function() {
    const result = loveFind.grabId(image);
    expect(result).toBe('53a26e1778195006a0033472');
  });
});
   