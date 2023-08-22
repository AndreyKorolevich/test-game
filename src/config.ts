export const config = {
  render: {
    height: 339,
  },
  sideColumn: {
    width: 48,
  },
  slotMachine: {
    countReels: 5,
    maxCountReels: 7,
    minCountReels: 3,
    balance: 100,
    bet: 10,
    startDelay: 700,
  },
  reel: {
    width: 118,
    countRows: 3,
    scale: {
      x: 1.2
    },
    previousPosition: 0,
    isSpinning: false,
    additionalRightOffset: 15,
    height: 339,
  },

  crank: {
    width: 99,
    height: 98,
    bcgWidth: 130,
    bcgHeight: 132,
  },

  cell: {
    width: 113,
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

  spin: {
    firstDelay: 2000,
    reelDela: 500,
    startOffset: 10
  }


}