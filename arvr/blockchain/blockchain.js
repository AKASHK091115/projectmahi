const crypto = require('crypto');
const Block = require('../models/block');

class Blockchain {
  constructor() {
    this.chain = [];
  }

  // Initialize chain from DB or create genesis block
  async init() {
    const blocks = await Block.findAll({ order: [['index', 'ASC']] });
    if (blocks.length === 0) {
      const genesisBlock = await this.createGenesisBlock();
      this.chain.push(genesisBlock);
      console.log('Genesis block created.');
    } else {
      this.chain = blocks.map(b => b.toJSON());
      console.log('Blockchain loaded from DB.');
    }
  }

  // Create the first block
  async createGenesisBlock() {
    const index = 0;
    const timestamp = new Date().toISOString();
    const data = { action: 'genesis' };
    const prevHash = '0';
    const hash = this.calculateHash(index, timestamp, data, prevHash);

    const block = await Block.create({ index, timestamp, data, prevHash, hash });
    return block.toJSON();
  }

  // Add new block to blockchain
  // async addBlock(data) {
  //   const latest = this.chain[this.chain.length - 1];
  //   const index = latest.index + 1;
  //   const timestamp = new Date().toISOString();
  //   const prevHash = latest.hash;
  //   const hash = this.calculateHash(index, timestamp, data, prevHash);

  //   const newBlock = await Block.create({ index, timestamp, data, prevHash, hash });
  //   this.chain.push(newBlock.toJSON());

  //   console.log(`Block #${index} added.`);
  //   return newBlock.toJSON();
  // }
// Add new block to blockchain
async addBlock(data) {
  const latest = this.chain[this.chain.length - 1];
  const index = latest.index + 1;
  const timestamp = new Date().toISOString();

  // 🛠️ Fix: sync timestamp in both data and block
  data.timestamp = timestamp;

  const prevHash = latest.hash;
  const hash = this.calculateHash(index, timestamp, data, prevHash);

  const newBlock = await Block.create({ index, timestamp, data, prevHash, hash });
  this.chain.push(newBlock.toJSON());

  console.log(`Block #${index} added.`);
  return newBlock.toJSON();
}

  // Hash function
  calculateHash(index, timestamp, data, prevHash) {
    return crypto
      .createHash('sha256')
      .update(index + timestamp + JSON.stringify(data) + prevHash)
      .digest('hex');
  }

  // Validate chain integrity
  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      if (current.prevHash !== previous.hash) {
        console.error(`Block #${current.index} has invalid prevHash.`);
        return false;
      }

      const recalculated = this.calculateHash(
        current.index, current.timestamp, current.data, current.prevHash
      );
      if (current.hash !== recalculated) {
        console.error(`Block #${current.index} has invalid hash.`);
        return false;
      }
    }
    return true;
  }
}

module.exports = Blockchain;
