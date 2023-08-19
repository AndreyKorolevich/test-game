export const config = {
  render: {
    height: 469,
  },
  sideColumn: {
    width: 60,
  },
  slotMachine: {
    countReels: 5,
    maxCountReels: 7,
    minCountReels: 3,
    balance: 500,
    bet: 10,
  },
  reel: {
    width: 145,
    countRows: 3,
    scale: 1,
    speed: 10,
    previousPosition: 0,
    isSpinning: false,
  },

  crank: {
    width: 90,
    height: 91,
    bcgWidth: 121,
    bcgHeight: 123,
  },

  text: {
    fontFamily: 'Times New Roman',
    color: 'green',
    fontSize: 30,
    bcg: 0xffc107,
    bcgWidth: 200
  }


}