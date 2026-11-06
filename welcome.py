"""
===========================================================
  🚀 Welcome to Zenith IDE!
  A fast, modern development environment with live execution.
===========================================================
"""

import sys
import time
import platform
import math

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def banner():
    print(r"""
  ____ _____ _   _ ___ _____ _   _   ___ ____  _____ 
 |_  /| ____| \ | |_ _|_   _| | | | |_ _|  _ \| ____|
  / / |  _| |  \| || |  | | | |_| |  | || | | |  _|  
 / /__| |___| |\  || |  | | |  _  |  | || |_| | |___ 
/_____|_____|_| \_|___| |_| |_| |_| |___|____/|_____|
    """)
    print("✨ Running on Python", sys.version.split()[0])
    print("💻 System Platform:", platform.system(), platform.release(), platform.machine())
    print("-" * 60)

def compute_primes(limit=50):
    print(f"\n🔢 Generating prime numbers up to {limit}:")
    primes = []
    for num in range(2, limit + 1):
        if all(num % i != 0 for i in range(2, int(math.isqrt(num)) + 1)):
            primes.append(num)
    print("  ", primes)
    return primes

def animated_simulation():
    print("\n⏳ Simulating background task with real-time stream:")
    for i in range(1, 6):
        pct = i * 20
        bar = "█" * (pct // 5) + "░" * (20 - (pct // 5))
        print(f"   [{bar}] {pct}% completed")
        time.sleep(0.1)
    print("   ✨ All tasks completed successfully!\n")

def main():
    banner()
    compute_primes(100)
    animated_simulation()
    print("💡 TIP: Press F5 or click 'Run' to execute this file anytime!")
    print("💡 Edit code and press Ctrl+S to save.\n")

if __name__ == "__main__":
    main()
