import 'jest-canvas-mock'
import 'pixi.js-legacy'
import Reel from '../machine/reel'

jest.mock('pixi.js', () => {
  return {
    default: jest.requireActual('pixi.js-legacy')
  };
});

import * as PIXI from 'pixi.js'


describe('Reel', () => {
  let app: PIXI.Application

  beforeEach(() => {
    // Create a PIXI Application with the mock canvas
    app = new PIXI.Application()
    app.loader.add('asset', 'asset1.json')
  })

  afterEach(() => {
    app.destroy()
  })

  it('should construct a Reel instance', () => {
    const reel = new Reel(app, 0, {}, jest.fn(), jest.fn())
    expect(reel).toBeInstanceOf(Reel)
    expect(reel.position).toBe(0)

  })

  it('should spin the reel and set blur', () => {
    const reel = new Reel(app, 0, {}, jest.fn(), jest.fn())
    reel.spin(0, 1, 0.5)
    expect(reel.position).toBeCloseTo(0.5, 5)

  })

  it('should set textures based on settings and target positions', () => {
    const targetPositions = new Set([1, 2, 3])
    const settings = {
      top: 1,
      center: 2,
      bottom: 3,
    }
    const getTargets = jest.fn(() => targetPositions)
    const isSpinning = jest.fn(() => true)
    const reel = new Reel(app, 0, settings, getTargets, isSpinning)

    // Simulate ticker update
    reel['_ticker'].update(0)


  })


})
