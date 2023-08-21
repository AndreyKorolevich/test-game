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
    balance: 100,
    bet: 10,
    startDelay: 700,
    reelDelay: 350,
  },
  reel: {
    width: 145,
    countRows: 3,
    scale: 1,
    speed: 20,
    previousPosition: 0,
    isSpinning: false,
    additionalRightOffset: 20,
    height: 469,
  },

  crank: {
    width: 90,
    height: 91,
    bcgWidth: 121,
    bcgHeight: 123,
  },

  text: {
    textStyle: {
      fontFamily: 'Arial',
      fontSize: 30,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff99'], // gradient
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 440,
    },
    actionTextStyle: {
      stroke: '#b03151',
      fontSize: 18,
      dropShadow: false
    },
    bcg: 0xffc107,
    bcgWidth: 250,
  },


}