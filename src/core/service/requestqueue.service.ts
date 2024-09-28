export class RequestQueue {
  private requestQueue: (() => Promise<void>)[] = [];
  private isProcessingQueue = false;
  private tokens = 100;
  private lastRefill: number = Date.now();

  private refillTokens() {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    const newTokens = Math.floor(elapsed / 10); // 100 requests per second
    this.tokens = Math.min(100, this.tokens + newTokens);
    this.lastRefill = now;
  }

  private async processQueue() {
    if (this.isProcessingQueue) return;
    this.isProcessingQueue = true;

    while (this.requestQueue.length > 0) {
      this.refillTokens();
      if (this.tokens > 0) {
        const request = this.requestQueue.shift();
        if (request) {
          this.tokens--;
          await request();
        }
      } else {
        await new Promise((res) => setTimeout(res, 10));
      }
    }

    this.isProcessingQueue = false;
  }

  enqueueRequest(requestFn: () => Promise<void>) {
    this.requestQueue.push(requestFn);
    void this.processQueue();
  }
}
