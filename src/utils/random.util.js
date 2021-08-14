class Random {
  int(min, max, fallback) {
    if (typeof min === 'undefined') {
      return Math.random();
    }

    const random = Math.floor(Math.random() * (max - min + 1)) + min

    if (typeof fallback === 'function') {
      return fallback(random);
    }

    return random;
  }

  choose(nums, fallback) {
    const random = nums[this.int(0, nums.length - 1)];

    if (typeof fallback === 'function') {
      return fallback(random);
    }

    return random;
  }

  tive(num) {
    const $this = this instanceof Random ? this : Random.instance();
    return $this.int(0, 1) ? num : -num;
  }

  static instance() {
    return new Random();
  }
}

export default Random.instance();