const imageCdn = 'https://img.swuyu.cn/upload/imgs';
const swiperList = [
  {
    value: `${imageCdn}/a4e15ca0aa94a00faa940c9a732d26a.jpg`,
    ariaLabel: '图片1',
  },
  {
    value: `${imageCdn}/7775791193a04de1474fc42edaadfb4.jpg`,
    ariaLabel: '图片2',
  },
];

Component({
  data: {
    current: 1,
    autoplay: true,
    duration: 500,
    interval: 5000,
    swiperList,
  },
});
