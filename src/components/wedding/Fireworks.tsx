'use client';

import React, { useEffect, useRef } from 'react';

const FireworksBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trailsCanvasRef = useRef<HTMLCanvasElement>(null);
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trailsCanvasRef.current || !mainCanvasRef.current) return;

    // --- Utility Classes & Helpers ---
    const MyMath = {
      random: (min: number, max: number) => Math.random() * (max - min) + min,
      clamp: (val: number, min: number, max: number) => Math.max(min, Math.min(val, max)),
      randomChoice: (arr: any[]) => arr[Math.floor(Math.random() * arr.length)],
      pointDist: (x1: number, y1: number, x2: number, y2: number) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2),
      pointAngle: (x1: number, y1: number, x2: number, y2: number) => Math.atan2(y2 - y1, x2 - x1),
    };

    const fscreen = {
      get fullscreenElement() { return document.fullscreenElement; },
      get fullscreenEnabled() { return (document as any).fullscreenEnabled || (document as any).webkitFullscreenEnabled; },
      requestFullscreen: (el: HTMLElement) => el.requestFullscreen(),
      exitFullscreen: () => document.exitFullscreen(),
      addEventListener: (type: string, handler: any) => document.addEventListener(type, handler),
      removeEventListener: (type: string, handler: any) => document.removeEventListener(type, handler),
    };

    class Stage {
      canvas: HTMLCanvasElement;
      ctx: CanvasRenderingContext2D;
      dpr: number;
      width: number = 0;
      height: number = 0;
      ticker: any = null;

      constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.dpr = window.devicePixelRatio || 1;
      }

      addEventListener(type: string, handler: any) {
        if (type === 'ticker') {
          this.ticker = handler;
        } else {
          // Simplified pointer events for internal use
          const listener = (e: MouseEvent | TouchEvent) => {
            const rect = this.canvas.getBoundingClientRect();
            let x, y;
            if ('touches' in e) {
              x = e.touches[0].clientX - rect.left;
              y = e.touches[0].clientY - rect.top;
            } else {
              x = (e as MouseEvent).clientX - rect.left;
              y = (e as MouseEvent).clientY - rect.top;
            }
            handler({ x, y, onCanvas: true });
          };
          const eventMap: any = {
            'pointerstart': ['mousedown', 'touchstart'],
            'pointerend': ['mouseup', 'touchend'],
            'pointermove': ['mousemove', 'touchmove']
          };
          if (eventMap[type]) {
            eventMap[type].forEach((evt: string) => this.canvas.addEventListener(evt, listener));
          }
        }
      }

      resize(w: number, h: number) {
        this.width = w;
        this.height = h;
        this.canvas.width = w * this.dpr;
        this.canvas.height = h * this.dpr;
        this.canvas.style.width = w + 'px';
        this.canvas.style.height = h + 'px';
      }
    }

    // --- Ported Fireworks Logic ---
    // (Adapted from the user-provided code)
    
    const IS_MOBILE = window.innerWidth <= 640;
    const IS_DESKTOP = window.innerWidth > 800;
    const MAX_WIDTH = 7680;
    const MAX_HEIGHT = 4320;
    const GRAVITY = 0.9;
    let simSpeed = 1;

    let stageW: number, stageH: number;
    let quality = 2;
    let isLowQuality = false;
    let isNormalQuality = true;
    let isHighQuality = false;

    const QUALITY_LOW = 1;
    const QUALITY_NORMAL = 2;
    const QUALITY_HIGH = 3;

    const COLOR = {
      Red: '#ff0043',
      Green: '#14fc56',
      Blue: '#1e7fff',
      Purple: '#e60aff',
      Gold: '#ffbf36',
      White: '#ffffff'
    };

    const INVISIBLE = '_INVISIBLE_';
    const PI_2 = Math.PI * 2;
    const PI_HALF = Math.PI * 0.5;

    const trailsStage = new Stage(trailsCanvasRef.current);
    const mainStage = new Stage(mainCanvasRef.current);
    const stages = [trailsStage, mainStage];

    const store = {
      state: {
        paused: false,
        config: {
          quality: String(QUALITY_NORMAL),
          shell: 'Random',
          size: IS_DESKTOP ? '3' : '2',
          autoLaunch: true,
          finale: false,
          skyLighting: '2',
          hideControls: true,
          longExposure: false,
          scaleFactor: IS_MOBILE ? 0.9 : 1
        }
      }
    };

    const COLOR_NAMES = Object.keys(COLOR);
    const COLOR_CODES = Object.values(COLOR);
    const COLOR_CODES_W_INVIS = [...COLOR_CODES, INVISIBLE];
    const COLOR_TUPLES: any = {};
    COLOR_CODES.forEach((hex: any) => {
      COLOR_TUPLES[hex] = {
        r: parseInt(hex.substr(1, 2), 16),
        g: parseInt(hex.substr(3, 2), 16),
        b: parseInt(hex.substr(5, 2), 16),
      };
    });

    function randomColorSimple() {
      return COLOR_CODES[Math.random() * COLOR_CODES.length | 0];
    }

    let lastColor: any;
    function randomColor(options?: any) {
      const notSame = options && options.notSame;
      const notColor = options && options.notColor;
      const limitWhite = options && options.limitWhite;
      let color = randomColorSimple();
      if (limitWhite && color === COLOR.White && Math.random() < 0.6) color = randomColorSimple();
      if (notSame) while (color === lastColor) color = randomColorSimple();
      else if (notColor) while (color === notColor) color = randomColorSimple();
      lastColor = color;
      return color;
    }

    function whiteOrGold() { return Math.random() < 0.5 ? COLOR.Gold : COLOR.White; }

    // Classes: Star, Spark, Shell, etc. (Simplified definitions)
    class StarInstance {
      visible: boolean = true;
      heavy: boolean = false;
      x: number = 0; y: number = 0;
      prevX: number = 0; prevY: number = 0;
      color: string = '';
      speedX: number = 0; speedY: number = 0;
      life: number = 0; fullLife: number = 0;
      spinAngle: number = 0; spinSpeed: number = 0.8; spinRadius: number = 0;
      sparkFreq: number = 0; sparkSpeed: number = 1; sparkTimer: number = 0;
      sparkColor: string = ''; sparkLife: number = 750; sparkLifeVariation: number = 0.25;
      strobe: boolean = false;
      updateFrame: number = 0;
      onDeath: any = null;
      secondColor: any = null;
      transitionTime: number = 0;
      colorChanged: boolean = false;
      strobeFreq: number = 0;
    }

    const Star: any = {
      drawWidth: 3,
      airDrag: 0.98,
      airDragHeavy: 0.992,
      active: {} as any,
      _pool: [] as StarInstance[],
      init() {
        COLOR_CODES_W_INVIS.forEach(c => this.active[c] = []);
      },
      add(x: number, y: number, color: string, angle: number, speed: number, life: number, speedOffX?: number, speedOffY?: number) {
        const instance = this._pool.pop() || new StarInstance();
        instance.visible = true; instance.heavy = false;
        instance.x = x; instance.y = y; instance.prevX = x; instance.prevY = y;
        instance.color = color;
        instance.speedX = Math.sin(angle) * speed + (speedOffX || 0);
        instance.speedY = Math.cos(angle) * speed + (speedOffY || 0);
        instance.life = life; instance.fullLife = life;
        instance.spinAngle = Math.random() * PI_2;
        instance.sparkFreq = 0; instance.sparkTimer = 0;
        instance.onDeath = null; instance.secondColor = null; instance.transitionTime = 0; instance.colorChanged = false;
        this.active[color].push(instance);
        return instance;
      },
      returnInstance(instance: StarInstance) {
        if (instance.onDeath) instance.onDeath(instance);
        this._pool.push(instance);
      }
    };
    Star.init();

    class SparkInstance {
      x: number = 0; y: number = 0;
      prevX: number = 0; prevY: number = 0;
      color: string = '';
      speedX: number = 0; speedY: number = 0;
      life: number = 0;
    }

    const Spark: any = {
      drawWidth: 1,
      airDrag: 0.9,
      active: {} as any,
      _pool: [] as SparkInstance[],
      init() {
        COLOR_CODES_W_INVIS.forEach(c => this.active[c] = []);
      },
      add(x: number, y: number, color: string, angle: number, speed: number, life: number) {
        const instance = this._pool.pop() || new SparkInstance();
        instance.x = x; instance.y = y; instance.prevX = x; instance.prevY = y;
        instance.color = color;
        instance.speedX = Math.sin(angle) * speed;
        instance.speedY = Math.cos(angle) * speed;
        instance.life = life;
        this.active[color].push(instance);
        return instance;
      },
      returnInstance(instance: SparkInstance) {
        this._pool.push(instance);
      }
    };
    Spark.init();

    class BurstFlashInstance {
      x: number = 0; y: number = 0; radius: number = 0;
    }
    const BurstFlash: any = {
      active: [] as BurstFlashInstance[],
      _pool: [] as BurstFlashInstance[],
      add(x: number, y: number, radius: number) {
        const instance = this._pool.pop() || new BurstFlashInstance();
        instance.x = x; instance.y = y; instance.radius = radius;
        this.active.push(instance);
      },
      returnInstance(instance: BurstFlashInstance) { this._pool.push(instance); }
    };

    // Shell Factories
    const crysanthemumShell = (size = 1) => {
      const glitter = Math.random() < 0.25;
      const color = randomColor({ limitWhite: true });
      return {
        shellSize: size,
        spreadSize: 300 + size * 100,
        starLife: 900 + size * 200,
        starDensity: glitter ? 1.1 : 1.25,
        color,
        glitter: glitter ? 'light' : '',
        glitterColor: whiteOrGold()
      };
    };

    const willowShell = (size = 1) => ({
      shellSize: size,
      spreadSize: 300 + size * 100,
      starDensity: 0.6,
      starLife: 3000 + size * 300,
      glitter: 'willow',
      glitterColor: COLOR.Gold,
      color: INVISIBLE
    });

    const floralShell = (size = 1) => ({
      shellSize: size,
      spreadSize: 300 + size * 120,
      starDensity: 0.12,
      starLife: 500 + size * 50,
      color: Math.random() < 0.65 ? 'random' : randomColor(),
      floral: true
    });

    const strobeShell = (size = 1) => {
      const color = randomColor({ limitWhite: true });
      return {
        shellSize: size,
        spreadSize: 280 + size * 92,
        starLife: 1100 + size * 200,
        color,
        glitter: 'light',
        glitterColor: COLOR.White,
        strobe: true
      };
    };

    class Shell {
      [key: string]: any;
      constructor(options: any) {
        Object.assign(this, options);
        this.starLifeVariation = options.starLifeVariation || 0.125;
        this.color = options.color || randomColor();
        this.glitterColor = options.glitterColor || this.color;
        if (!this.starCount) {
          const density = options.starDensity || 1;
          const scaledSize = this.spreadSize / 54;
          this.starCount = Math.max(6, scaledSize * scaledSize * density);
        }
      }
      launch(position: number, launchHeight: number) {
        const width = stageW; const height = stageH;
        const hpad = 60; const vpad = 50;
        const minHeight = height - height * 0.45;
        const launchX = position * (width - hpad * 2) + hpad;
        const burstY = minHeight - (launchHeight * (minHeight - vpad));
        const launchDistance = height - burstY;
        const launchVelocity = Math.pow(launchDistance * 0.04, 0.64);
        
        // Ensure valid color for comet
        let cometColor = COLOR.White;
        if (typeof this.color === 'string' && this.color !== INVISIBLE && this.color !== 'random') {
          cometColor = this.color;
        }
        
        const comet = Star.add(launchX, height, cometColor, Math.PI, launchVelocity, launchVelocity * 400);
        comet.heavy = true; comet.spinRadius = MyMath.random(0.32, 0.85); comet.sparkFreq = 32 / quality; comet.sparkLife = 320;
        comet.onDeath = (c: any) => this.burst(c.x, c.y);
      }
      burst(x: number, y: number) {
        const speed = this.spreadSize / 96;
        const starFactory = (angle: number, speedMult: number) => {
          let starColor = this.color;
          if (starColor === 'random') starColor = randomColor();
          if (!COLOR_CODES_W_INVIS.includes(starColor as any)) starColor = randomColor();

          const star = Star.add(x, y, starColor, angle, speedMult * speed, this.starLife + Math.random() * this.starLife * this.starLifeVariation, 0, -this.spreadSize / 1800);
          if (this.glitter) {
            star.sparkFreq = (this.glitter === 'willow' ? 120 : (this.glitter === 'light' ? 400 : 200)) / quality;
            star.sparkSpeed = 0.3; star.sparkLife = 700; star.sparkColor = this.glitterColor;
          }
          if (this.strobe) {
            star.strobe = true;
            star.strobeFreq = Math.random() * 20 + 40;
          }
        };
        const count = this.starCount;
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * PI_2;
          const speedMult = Math.random();
          starFactory(angle, speedMult);
        }
        BurstFlash.add(x, y, this.spreadSize / 4);
      }
    }

    function startSequence() {
      const types = [crysanthemumShell, willowShell, floralShell, strobeShell];
      const type = MyMath.randomChoice(types);
      const shell = new Shell(type(Number(store.state.config.size)));
      shell.launch(MyMath.random(0.1, 0.9), MyMath.random(0.5, 0.9));
      return 1000 + Math.random() * 500;
    }

    let currentFrame = 0;
    let autoLaunchTime = 0;

    function update(frameTime: number, lag: number) {
      currentFrame++;
      const timeStep = frameTime * simSpeed;
      const speed = simSpeed * lag;

      if (store.state.config.autoLaunch) {
        autoLaunchTime -= timeStep;
        if (autoLaunchTime <= 0) autoLaunchTime = startSequence() * 1.25;
      }

      const starDrag = 1 - (1 - Star.airDrag) * speed;
      const starDragHeavy = 1 - (1 - Star.airDragHeavy) * speed;
      const sparkDrag = 1 - (1 - Spark.airDrag) * speed;
      const gAcc = timeStep / 1000 * GRAVITY;

      COLOR_CODES_W_INVIS.forEach((color: any) => {
        const stars = Star.active[color];
        for (let i = stars.length - 1; i >= 0; i--) {
          const star = stars[i];
          if (star.updateFrame === currentFrame) continue;
          star.updateFrame = currentFrame;
          star.life -= timeStep;
          if (star.life <= 0) {
            stars.splice(i, 1);
            Star.returnInstance(star);
          } else {
            star.prevX = star.x; star.prevY = star.y;
            star.x += star.speedX * speed; star.y += star.speedY * speed;
            if (!star.heavy) { star.speedX *= starDrag; star.speedY *= starDrag; }
            else { star.speedX *= starDragHeavy; star.speedY *= starDragHeavy; }
            star.speedY += gAcc;
            if (star.sparkFreq) {
              star.sparkTimer -= timeStep;
              while (star.sparkTimer < 0) {
                star.sparkTimer += star.sparkFreq;
                Spark.add(star.x, star.y, star.sparkColor || star.color, Math.random() * PI_2, Math.random() * star.sparkSpeed, 300);
              }
            }
          }
        }
        const sparks = Spark.active[color];
        for (let i = sparks.length - 1; i >= 0; i--) {
          const spark = sparks[i];
          spark.life -= timeStep;
          if (spark.life <= 0) {
            sparks.splice(i, 1);
            Spark.returnInstance(spark);
          } else {
            spark.prevX = spark.x; spark.prevY = spark.y;
            spark.x += spark.speedX * speed; spark.y += spark.speedY * speed;
            spark.speedX *= sparkDrag; spark.speedY *= sparkDrag;
            spark.speedY += gAcc;
          }
        }
      });

      render(speed);
    }

    function render(speed: number) {
      const { dpr } = mainStage;
      const trailsCtx = trailsStage.ctx;
      const mainCtx = mainStage.ctx;
      const scaleFactor = Number(store.state.config.scaleFactor);
      
      trailsCtx.setTransform(dpr * scaleFactor, 0, 0, dpr * scaleFactor, 0, 0);
      mainCtx.setTransform(dpr * scaleFactor, 0, 0, dpr * scaleFactor, 0, 0);

      // Use destination-out to fade trails while maintaining transparency
      trailsCtx.globalCompositeOperation = 'destination-out';
      trailsCtx.fillStyle = `rgba(0, 0, 0, ${0.175 * speed})`;
      trailsCtx.fillRect(0, 0, stageW, stageH);
      mainCtx.clearRect(0, 0, stageW, stageH);

      while (BurstFlash.active.length) {
        const bf = BurstFlash.active.pop()!;
        const burstGradient = trailsCtx.createRadialGradient(bf.x, bf.y, 0, bf.x, bf.y, bf.radius);
        burstGradient.addColorStop(0.024, 'rgba(255, 255, 255, 1)');
        burstGradient.addColorStop(0.125, 'rgba(255, 160, 20, 0.2)');
        burstGradient.addColorStop(1, 'rgba(255, 120, 20, 0)');
        
        trailsCtx.globalCompositeOperation = 'screen';
        trailsCtx.fillStyle = burstGradient;
        trailsCtx.fillRect(bf.x - bf.radius, bf.y - bf.radius, bf.radius * 2, bf.radius * 2);
        BurstFlash.returnInstance(bf);
      }

      trailsCtx.globalCompositeOperation = 'lighter';
      trailsCtx.lineWidth = 2;
      COLOR_CODES.forEach((color: any) => {
        const stars = Star.active[color];
        trailsCtx.strokeStyle = color;
        trailsCtx.beginPath();
        stars.forEach((star: any) => {
          if (star.visible) {
            trailsCtx.moveTo(star.x, star.y);
            trailsCtx.lineTo(star.prevX, star.prevY);
          }
        });
        trailsCtx.stroke();
        
        const sparks = Spark.active[color];
        trailsCtx.beginPath();
        sparks.forEach((spark: any) => {
          trailsCtx.moveTo(spark.x, spark.y);
          trailsCtx.lineTo(spark.prevX, spark.prevY);
        });
        trailsCtx.stroke();
      });

      trailsCtx.setTransform(1, 0, 0, 1, 0, 0);
      mainCtx.setTransform(1, 0, 0, 1, 0, 0);
    }

    function handleResize() {
      const rect = containerRef.current!.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      trailsStage.resize(w, h);
      mainStage.resize(w, h);
      const scaleFactor = Number(store.state.config.scaleFactor);
      stageW = w / scaleFactor;
      stageH = h / scaleFactor;
    }

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(containerRef.current!);

    let lastTime = performance.now();
    let rafId: number;
    const loop = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;
      update(dt, dt / 16.6);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas id="trails-canvas" ref={trailsCanvasRef} className="absolute inset-0 mix-blend-lighten" />
      <canvas id="main-canvas" ref={mainCanvasRef} className="absolute inset-0 mix-blend-lighten" />
    </div>
  );
};

export default FireworksBackground;
