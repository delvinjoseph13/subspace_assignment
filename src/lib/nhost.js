import { NhostClient } from '@nhost/react';

const nhost = new NhostClient({
  subdomain: 'zbrhftolgwmfprzoailu',
  region: 'eu-central-1'  // your project region (Frankfurt)
});

export { nhost };