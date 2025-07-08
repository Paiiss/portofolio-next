'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface SlotMachineContext {
  balance: number;
  bet: number;
  currentSlots: string[];
  isSpinning: boolean;
  lastResult: 'WIN' | 'LOSE' | 'JACKPOT' | null;
  winAmount: number;
  spinCount: number;
}

type FSAState = 'IDLE' | 'READY' | 'BETTING' | 'SPINNING' | 'SHOWING_RESULT';

interface StartEvent {
  type: 'START';
}

interface BetEvent {
  type: 'BET';
  value: number;
}

interface SpinEvent {
  type: 'SPIN';
}

interface ResultEvent {
  type: 'SHOW_RESULT';
}

interface ResetEvent {
  type: 'RESET';
}

type FSAEvent = StartEvent | BetEvent | SpinEvent | ResultEvent | ResetEvent;

const EVENTS = {
  START: 'START' as const,
  BET: 'BET' as const,
  SPIN: 'SPIN' as const,
  SHOW_RESULT: 'SHOW_RESULT' as const,
  RESET: 'RESET' as const,
} as const;

const symbols = {
  '🍒': { value: 2, name: 'Cherry' },
  '🍋': { value: 3, name: 'Lemon' },
  '🍊': { value: 4, name: 'Orange' },
  '🍇': { value: 5, name: 'Grape' },
  '🔔': { value: 8, name: 'Bell' },
  '💎': { value: 15, name: 'Diamond' },
};

const symbolArray = Object.keys(symbols);

class SlotMachineStateMachine {
  public state: FSAState;
  public context: SlotMachineContext;
  private stateHistory: FSAState[] = [];

  constructor() {
    this.state = 'IDLE';
    this.context = {
      balance: 1000,
      bet: 0,
      currentSlots: ['🍒', '🍒', '🍒'],
      isSpinning: false,
      lastResult: null,
      winAmount: 0,
      spinCount: 0,
    };
  }

  async send(event: FSAEvent): Promise<SlotMachineContext> {
    this.stateHistory.push(this.state);

    switch (this.state) {
      case 'IDLE':
        if (event.type === EVENTS.START) {
          this.state = 'READY';
          this.context.currentSlots = ['🍒', '🍒', '🍒'];
          this.context.lastResult = null;
          this.context.winAmount = 0;
          console.log('State: READY');
        }
        break;

      case 'READY':
        if (event.type === EVENTS.BET) {
          const betEvent = event as BetEvent;
          if (betEvent.value > this.context.balance) {
            throw new Error('Insufficient Balance!');
          }
          if (betEvent.value <= 0) {
            throw new Error('Invalid Bet Amount!');
          }

          this.context.bet = betEvent.value;
          this.context.balance -= betEvent.value;
          this.context.lastResult = null;
          this.context.winAmount = 0;
          this.state = 'BETTING';
          console.log('State: BETTING');
        } else if (event.type === EVENTS.RESET) {
          this.state = 'IDLE';
          this.resetContext();
          console.log('State: IDLE (Reset)');
        }
        break;

      case 'BETTING':
        if (event.type === EVENTS.SPIN) {
          this.state = 'SPINNING';
          this.context.isSpinning = true;
          this.context.spinCount++;
          console.log('State: SPINNING');

          const results = this.generateSpinResults();
          this.context.currentSlots = results;
        }
        break;

      case 'SPINNING':
        if (event.type === EVENTS.SHOW_RESULT) {
          this.context.isSpinning = false;
          this.state = 'SHOWING_RESULT';

          const result = this.calculateResult();
          this.context.lastResult = result.type;
          this.context.winAmount = result.amount;
          this.context.balance += result.amount;

          console.log('State: SHOWING_RESULT', { result: result.type, amount: result.amount });

          setTimeout(() => {
            this.state = 'READY';
            console.log('State: READY (Auto transition)');
          }, 4000);
        }
        break;

      case 'SHOWING_RESULT':
        break;

      default:
        console.log('Invalid transition');
    }

    return this.context;
  }

  private generateSpinResults(): string[] {
    return [
      symbolArray[Math.floor(Math.random() * symbolArray.length)],
      symbolArray[Math.floor(Math.random() * symbolArray.length)],
      symbolArray[Math.floor(Math.random() * symbolArray.length)],
    ];
  }

  private calculateResult(): {
    type: 'WIN' | 'LOSE' | 'JACKPOT';
    amount: number;
  } {
    const [first, second, third] = this.context.currentSlots;

    if (first === '💎' && second === '💎' && third === '💎') {
      return { type: 'JACKPOT', amount: this.context.bet * 50 };
    }

    if (first === second && second === third) {
      const multiplier = symbols[first as keyof typeof symbols].value;
      return { type: 'WIN', amount: this.context.bet * multiplier };
    }

    if (first === second || second === third || first === third) {
      return { type: 'WIN', amount: Math.floor(this.context.bet * 1.5) };
    }

    return { type: 'LOSE', amount: 0 };
  }

  private resetContext(): void {
    this.context = {
      balance: 1000,
      bet: 0,
      currentSlots: ['🍒', '🍒', '🍒'],
      isSpinning: false,
      lastResult: null,
      winAmount: 0,
      spinCount: 0,
    };
  }

  public getStateInfo() {
    return {
      currentState: this.state,
      history: this.stateHistory,
      context: this.context,
      validTransitions: this.getValidTransitions(),
    };
  }

  private getValidTransitions(): string[] {
    switch (this.state) {
      case 'IDLE':
        return ['START'];
      case 'READY':
        return ['BET', 'RESET'];
      case 'BETTING':
        return ['SPIN'];
      case 'SPINNING':
        return ['SHOW_RESULT'];
      case 'SHOWING_RESULT':
        return ['(auto to READY)'];
      default:
        return [];
    }
  }
}

interface SlotReelProps {
  finalSymbol: string;
  isSpinning: boolean;
  reelIndex: number;
  onSpinComplete?: () => void;
}

const SlotReel: React.FC<SlotReelProps> = ({
  finalSymbol,
  isSpinning,
  reelIndex,
  onSpinComplete,
}) => {
  const [displaySymbol, setDisplaySymbol] = useState(finalSymbol);
  const [isReelSpinning, setIsReelSpinning] = useState(false);

  useEffect(() => {
    if (isSpinning && !isReelSpinning) {
      setIsReelSpinning(true);

      const spinInterval = setInterval(() => {
        const randomSymbol = symbolArray[Math.floor(Math.random() * symbolArray.length)];
        setDisplaySymbol(randomSymbol);
      }, 100);

      const totalSpinTime = 3000;
      setTimeout(() => {
        clearInterval(spinInterval);
        setDisplaySymbol(finalSymbol);
        setIsReelSpinning(false);
        if (onSpinComplete) onSpinComplete();
      }, totalSpinTime);
    }

    if (!isSpinning && !isReelSpinning) {
      setDisplaySymbol(finalSymbol);
    }
  }, [isSpinning, finalSymbol, reelIndex, onSpinComplete, isReelSpinning]);

  return (
    <div className="relative h-24 w-24 rounded-xl border-4 border-yellow-500 bg-gradient-to-b from-yellow-100 to-yellow-200 shadow-inner">
      <div className="absolute inset-0 rounded-lg border-2 border-gray-300 shadow-inner"></div>

      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/30 via-transparent to-transparent"></div>

      <div
        className="relative z-10 flex h-24 w-24 items-center justify-center text-4xl font-bold"
        style={{
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }}
      >
        {displaySymbol}
      </div>

      {isReelSpinning && (
        <div className="absolute inset-0 z-20 rounded-lg border-2 border-yellow-400 opacity-50" />
      )}

      <div className="absolute -bottom-3 left-1/2 z-50 -translate-x-1/2 transform rounded bg-black px-2 py-1 text-xs font-bold text-yellow-400">
        {reelIndex + 1}
      </div>
    </div>
  );
};

const View: React.FC = () => {
  const [machine] = useState<SlotMachineStateMachine>(() => new SlotMachineStateMachine());
  const [gameState, setGameState] = useState<SlotMachineContext>(machine.context);
  const [betAmount, setBetAmount] = useState<number>(50);
  const [currentState, setCurrentState] = useState<FSAState>('IDLE');
  const [completedReels, setCompletedReels] = useState<number>(0);
  const [showFSAInfo, setShowFSAInfo] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGameState({ ...machine.context });
      setCurrentState(machine.state);
    }, 100);

    return () => clearInterval(interval);
  }, [machine]);

  useEffect(() => {
    const initializeGame = async (): Promise<void> => {
      await machine.send({ type: EVENTS.START });
      setGameState({ ...machine.context });
      setCurrentState(machine.state);
    };
    initializeGame();
  }, [machine]);

  const handleBet = async (): Promise<void> => {
    if (currentState !== 'READY') return;
    try {
      await machine.send({ type: EVENTS.BET, value: betAmount });
      setGameState({ ...machine.context });
      setCurrentState(machine.state);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleSpin = async (): Promise<void> => {
    if (currentState !== 'BETTING') return;

    setCompletedReels(0);

    await machine.send({ type: EVENTS.SPIN });
    setGameState({ ...machine.context });
    setCurrentState(machine.state);

    setTimeout(async () => {
      await machine.send({ type: EVENTS.SHOW_RESULT });
      setGameState({ ...machine.context });
      setCurrentState(machine.state);
    }, 3000);
  };

  const handleReelComplete = () => {
    setCompletedReels((prev) => prev + 1);
  };

  const resetGame = async (): Promise<void> => {
    await machine.send({ type: EVENTS.RESET });
    await machine.send({ type: EVENTS.START });
    setGameState({ ...machine.context });
    setCurrentState(machine.state);
    setCompletedReels(0);
  };

  const fsaInfo = machine.getStateInfo();

  return (
    <div className="p-4">
      <div className="flex min-h-screen flex-col items-center justify-center">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            animate={{
              textShadow: [
                '0 0 20px rgba(255, 215, 0, 0.5)',
                '0 0 40px rgba(255, 215, 0, 0.8)',
                '0 0 20px rgba(255, 215, 0, 0.5)',
              ],
            }}
            className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-6xl font-bold text-transparent drop-shadow-2xl"
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎰 VEGAS ROYALE 🎰
          </motion.h1>
          <p className="mt-2 text-xl font-semibold text-yellow-300">
            Premium Slot Machine Experience
          </p>
        </motion.div>

        <motion.div
          className="relative overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-yellow-400/20 via-red-500/20 to-pink-500/20 blur-xl"></div>

          <div className="relative overflow-hidden rounded-3xl border-8 border-yellow-500 bg-gradient-to-b from-gray-800 via-gray-900 to-black p-0 shadow-2xl md:p-8">
            <div className="mb-6 rounded-2xl border-4 border-yellow-400 bg-black p-4 shadow-inner md:p-6">
              <div className="rounded-lg bg-gradient-to-r from-blue-900 to-purple-900 p-2 text-center md:p-4">
                <motion.div
                  className="mb-2 text-2xl font-bold text-yellow-300"
                  animate={gameState.isSpinning ? { opacity: [1, 0.5, 1] } : {}}
                  transition={{
                    duration: 0.5,
                    repeat: gameState.isSpinning ? Infinity : 0,
                  }}
                >
                  {gameState.isSpinning
                    ? '🎲 SPINNING 🎲'
                    : currentState === 'BETTING'
                      ? '🎯 READY TO SPIN 🎯'
                      : currentState === 'READY'
                        ? '💰 PLACE YOUR BET 💰'
                        : currentState === 'SHOWING_RESULT'
                          ? '🎉 CHECKING RESULTS 🎉'
                          : '🎰 SLOT MACHINE 🎰'}
                </motion.div>

                <AnimatePresence mode="wait">
                  {gameState.lastResult && currentState === 'SHOWING_RESULT' && (
                    <motion.div
                      key={gameState.lastResult}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className={`rounded p-2 text-xl font-bold ${
                        gameState.lastResult === 'JACKPOT'
                          ? 'bg-yellow-600/20 text-yellow-300'
                          : gameState.lastResult === 'WIN'
                            ? 'bg-green-600/20 text-green-300'
                            : 'bg-red-600/20 text-red-300'
                      }`}
                    >
                      {gameState.lastResult === 'JACKPOT' && '🏆 JACKPOT! 🏆'}
                      {gameState.lastResult === 'WIN' && '✨ YOU WIN! ✨'}
                      {gameState.lastResult === 'LOSE' && '💀 TRY AGAIN 💀'}
                      {gameState.winAmount > 0 && (
                        <div className="mt-1 text-lg">+${gameState.winAmount}</div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mb-6 rounded-2xl border-4 border-yellow-300 bg-gradient-to-b from-yellow-400 to-yellow-600 p-2 shadow-lg md:p-6">
              {/* {gameState.isSpinning && (
                <motion.div
                  className="absolute -right-2 -top-2 z-20 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      '0 0 10px rgba(239, 68, 68, 0.5)',
                      '0 0 20px rgba(239, 68, 68, 0.8)',
                      '0 0 10px rgba(239, 68, 68, 0.5)',
                    ],
                  }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  SPINNING
                </motion.div>
              )} */}

              <div className="flex justify-center space-x-4">
                {gameState.currentSlots.map((symbol: string, index: number) => (
                  <motion.div
                    key={`reel-${index}`}
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <SlotReel
                      finalSymbol={symbol}
                      isSpinning={gameState.isSpinning}
                      reelIndex={index}
                      onSpinComplete={handleReelComplete}
                    />
                  </motion.div>
                ))}
              </div>

              {gameState.isSpinning && (
                <div className="mt-4 flex justify-center space-x-2">
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      className={`h-3 w-3 rounded-full ${
                        completedReels > index ? 'bg-green-400' : 'bg-gray-400'
                      }`}
                      animate={completedReels > index ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-xl border-4 border-gray-600 bg-gradient-to-b from-gray-700 to-gray-800 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="h-10 w-10 rounded-full border-2 border-red-300 bg-gradient-to-b from-red-400 to-red-600 shadow-lg"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="h-10 w-10 rounded-full border-2 border-blue-300 bg-gradient-to-b from-blue-400 to-blue-600 shadow-lg"
                  />
                </div>

                <motion.button
                  onClick={handleSpin}
                  disabled={currentState !== 'BETTING'}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative h-16 w-16 rounded-full border-4 border-red-300 bg-gradient-to-b from-red-400 to-red-600 shadow-2xl disabled:cursor-not-allowed disabled:opacity-50"
                  animate={
                    gameState.isSpinning
                      ? {
                          rotate: 360,
                          boxShadow: [
                            '0 0 20px rgba(239, 68, 68, 0.5)',
                            '0 0 40px rgba(239, 68, 68, 0.8)',
                            '0 0 20px rgba(239, 68, 68, 0.5)',
                          ],
                        }
                      : {
                          rotate: 0,
                          boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)',
                        }
                  }
                  transition={{
                    rotate: {
                      duration: gameState.isSpinning ? 2 : 0.3,
                      repeat: gameState.isSpinning ? Infinity : 0,
                      ease: gameState.isSpinning ? 'linear' : 'easeOut',
                    },
                    boxShadow: {
                      duration: 1,
                      repeat: gameState.isSpinning ? Infinity : 0,
                    },
                  }}
                >
                  <div className="absolute inset-2 flex items-center justify-center rounded-full bg-gradient-to-b from-red-300 to-red-500">
                    <span className="text-sm font-bold text-white">SPIN</span>
                  </div>
                </motion.button>
              </div>

              <div className="rounded-lg border-2 border-yellow-300 bg-gradient-to-b from-yellow-400 to-yellow-600 p-3 text-center">
                <div className="text-sm font-bold text-black">💰 COIN SLOT 💰</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 rounded-2xl border-2 border-yellow-500 bg-black/50 p-6 backdrop-blur-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="mb-6 grid grid-cols-2 gap-4 text-center md:grid-cols-4">
            <div className="rounded-lg border border-green-500 bg-green-600/20 p-3">
              <div className="text-sm font-bold text-green-400">💰 BALANCE</div>
              <div className="text-xl font-bold text-white">${gameState.balance}</div>
            </div>
            <div className="rounded-lg border border-yellow-500 bg-yellow-600/20 p-3">
              <div className="text-sm font-bold text-yellow-400">🎯 CURRENT BET</div>
              <div className="text-xl font-bold text-white">${gameState.bet}</div>
            </div>
            <div className="rounded-lg border border-blue-500 bg-blue-600/20 p-3">
              <div className="text-sm font-bold text-blue-400">🔄 SPINS</div>
              <div className="text-xl font-bold text-white">{gameState.spinCount}</div>
            </div>
            <div className="rounded-lg border border-purple-500 bg-purple-600/20 p-3">
              <div className="text-sm font-bold text-purple-400">⚡ FSA STATE</div>
              <div className="text-lg font-bold text-white">{currentState}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <label htmlFor="bet-amount" className="font-bold text-yellow-300">
                💵 Bet Amount:
              </label>
              <select
                id="bet-amount"
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))}
                disabled={currentState === 'SPINNING' || currentState === 'SHOWING_RESULT'}
                className="rounded-lg border-2 border-yellow-500 bg-black/70 px-4 py-2 font-bold text-white"
              >
                {[10, 25, 50, 100, 250, 500].map((option) => (
                  <option key={option} value={option}>
                    ${option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                onClick={handleBet}
                disabled={currentState !== 'READY' || gameState.balance < betAmount}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg border-2 border-yellow-400 bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-3 font-bold text-black shadow-lg hover:from-yellow-400 hover:to-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                💰 PLACE BET
              </motion.button>

              <motion.button
                onClick={resetGame}
                disabled={currentState === 'SPINNING' || currentState === 'SHOWING_RESULT'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg border-2 border-red-400 bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 font-bold text-white shadow-lg hover:from-red-400 hover:to-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                🔄 RESET GAME
              </motion.button>

              <motion.button
                onClick={() => setShowFSAInfo(!showFSAInfo)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg border-2 border-purple-400 bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-3 font-bold text-white shadow-lg hover:from-purple-400 hover:to-purple-500"
              >
                🔧 FSA INFO
              </motion.button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {showFSAInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 max-w-4xl rounded-2xl border-2 border-cyan-500 bg-gray-900/90 p-6 backdrop-blur-md"
            >
              <h3 className="mb-4 text-center text-xl font-bold text-cyan-400">
                🔧 Finite State Automaton (FSA) Debug Panel
              </h3>

              <div className="grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
                <div className="rounded-lg border border-cyan-600 bg-cyan-900/20 p-4">
                  <h4 className="mb-2 font-bold text-cyan-300">🔄 Current State Information</h4>
                  <div className="space-y-2">
                    <div className="text-white">
                      <span className="text-cyan-400">Current State:</span>
                      <span className="ml-2 font-bold text-yellow-300">{fsaInfo.currentState}</span>
                    </div>
                    <div className="text-white">
                      <span className="text-cyan-400">Valid Transitions:</span>
                      <div className="ml-2 text-green-300">
                        {fsaInfo.validTransitions.join(', ')}
                      </div>
                    </div>
                    <div className="text-white">
                      <span className="text-cyan-400">State History:</span>
                      <div className="ml-2 text-xs text-gray-300">
                        {fsaInfo.history.slice(-5).join(' → ')}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-purple-600 bg-purple-900/20 p-4">
                  <h4 className="mb-2 font-bold text-purple-300">📊 FSA Context Data</h4>
                  <div className="space-y-1 text-xs text-white">
                    <div>
                      <span className="text-purple-400">Balance:</span> ${fsaInfo.context.balance}
                    </div>
                    <div>
                      <span className="text-purple-400">Current Bet:</span> ${fsaInfo.context.bet}
                    </div>
                    <div>
                      <span className="text-purple-400">Is Spinning:</span>{' '}
                      {fsaInfo.context.isSpinning ? 'Yes' : 'No'}
                    </div>
                    <div>
                      <span className="text-purple-400">Last Result:</span>{' '}
                      {fsaInfo.context.lastResult || 'None'}
                    </div>
                    <div>
                      <span className="text-purple-400">Win Amount:</span> $
                      {fsaInfo.context.winAmount}
                    </div>
                    <div>
                      <span className="text-purple-400">Total Spins:</span>{' '}
                      {fsaInfo.context.spinCount}
                    </div>
                    <div>
                      <span className="text-purple-400">Current Slots:</span>{' '}
                      {fsaInfo.context.currentSlots.join(' ')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-indigo-600 bg-indigo-900/20 p-4">
                <h4 className="mb-3 font-bold text-indigo-300">🎯 FSA State Diagram</h4>
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                  {['IDLE', 'READY', 'BETTING', 'SPINNING', 'SHOWING_RESULT'].map(
                    (state, index) => (
                      <React.Fragment key={state}>
                        <div
                          className={`rounded-lg border-2 px-3 py-2 font-bold ${
                            state === currentState
                              ? 'border-yellow-300 bg-yellow-500 text-black'
                              : 'border-gray-500 bg-gray-700 text-white'
                          }`}
                        >
                          {state}
                        </div>
                        {index < 4 && <span className="text-gray-400">→</span>}
                      </React.Fragment>
                    ),
                  )}
                </div>

                <div className="mt-4 text-center">
                  <div className="mb-2 text-sm font-semibold text-indigo-300">
                    FSA Transition Rules:
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-xs text-gray-300 md:grid-cols-2">
                    <div>🔄 IDLE → READY (START)</div>
                    <div>💰 READY → BETTING (BET)</div>
                    <div>🎲 BETTING → SPINNING (SPIN)</div>
                    <div>⚡ SPINNING → SHOWING_RESULT (SHOW_RESULT)</div>
                    <div>📊 SHOWING_RESULT → READY (Auto)</div>
                    <div>🔄 ANY → IDLE (RESET)</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-green-600 bg-green-900/20 p-4">
                <h4 className="mb-3 font-bold text-green-300">🎰 Symbol Values & Payouts</h4>
                <div className="grid grid-cols-2 gap-3 text-xs md:grid-cols-3">
                  {Object.entries(symbols).map(([symbol, info]) => (
                    <div key={symbol} className="rounded bg-black/30 p-2 text-center">
                      <div className="mb-1 text-2xl">{symbol}</div>
                      <div className="font-bold text-white">{info.name}</div>
                      <div className="text-green-400">×{info.value}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-center">
                  <div className="font-bold text-yellow-300">💎💎💎 = JACKPOT ×50</div>
                  <div className="text-green-300">Two matching = ×1.5</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default View;
