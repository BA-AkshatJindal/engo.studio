"""
===========================================================
  🚀 Welcome to ENGO.STUDIO!
  The Forward Deployed Engineering OS | Unified Agile & Code Studio
  Designed & Developed by Akshat Jindal
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
 _____ _   _  ____  ___        ____ _____ _   _ ____ ___ ___  
| ____| \ | |/ ___|/ _ \      / ___|_   _| | | |  _ \_ _/ _ \ 
|  _| |  \| | |  _| | | |_____\___ \ | | | | | | | | | | | | |
| |___| |\  | |_| | |_| |_____|___) || | | |_| | |_| | | |_| |
|_____|_| \_|\____|\___/     |____/ |_|  \___/|____/___|\___/ 
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
