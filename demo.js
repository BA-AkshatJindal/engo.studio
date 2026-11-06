/**
 * Zenith IDE - JavaScript Execution Demo
 * Runs directly inside Node.js!
 */

console.log("⚡ Zenith IDE - Node.js Runtime Engine");
console.log("-----------------------------------------");
console.log(`Node Version: ${process.version}`);
console.log(`Current Time: ${new Date().toLocaleTimeString()}`);

// Asynchronous execution test
async function runDemo() {
  console.log("\n🚀 Testing async operations and benchmarks...");
  
  const startTime = Date.now();
  
  // Calculate fibonacci sequence
  function fib(n) {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
      const c = a + b;
      a = b;
      b = c;
    }
    return b;
  }

  const results = [];
  for (let i = 0; i <= 20; i++) {
    results.push(`fib(${i}) = ${fib(i)}`);
  }
  
  console.log("Fibonacci numbers (first 20):");
  console.log(results.slice(0, 10).join(', '));
  console.log(results.slice(10).join(', '));

  console.log(`\n⏱️ Execution time: ${Date.now() - startTime}ms`);
  console.log("✅ JavaScript executed cleanly in Zenith IDE!");
}

runDemo();
