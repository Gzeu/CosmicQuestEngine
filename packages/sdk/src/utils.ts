import { TransactionPayload } from '@multiversx/sdk-core';

// Helpers pentru construirea datelor ESDT / SC
export function scCall(functionName: string, ...args: (string | number)[]) {
  const encodedArgs = args.map(String).join(' ');
  return new TransactionPayload(`function:${functionName} ${encodedArgs}`);
}
