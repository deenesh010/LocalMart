const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const ProductInteraction = require('../models/ProductInteraction');
const cosineSimilarity = require('../helpers/cosineSimilarity');

const natural = require('natural');
const TfIdf = natural.TfIdf;

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const interactions = await ProductInteraction.find({ userId });
    const userProductIds = interactions.map(interaction => interaction.productId);

    if (userProductIds.length === 0) {
      return res.status(200).json([]);
    }

    const availableProducts = await Product.find({
      quantity: { $gt: 0 },
      _id: { $nin: userProductIds }
    });

    if (availableProducts.length === 0) {
      return res.status(200).json([]);
    }

    const productFeatures = availableProducts.map(p => `${p.description} ${p.discounted_price}`);
    const userProducts = await Product.find({ _id: { $in: userProductIds } });
    const userProductFeatures = userProducts.map(p => `${p.description} ${p.discounted_price}`);

    const tfidf = new TfIdf();
    productFeatures.forEach(doc => tfidf.addDocument(doc));

    const userVectors = userProductFeatures.map(userDoc => {
      const vector = [];
      tfidf.tfidfs(userDoc, function (i, measure) {
        vector.push(measure);
      });
      return vector;
    });

    const productVectors = [];
    tfidf.documents.forEach(doc => {
      const vector = [];
      tfidf.listTerms(tfidf.documents.indexOf(doc)).forEach(term => {
        vector.push(term.tfidf);
      });
      productVectors.push(vector);
    });

    const similarities = productVectors.map(productVec => {
      const sim = userVectors.map(userVec => cosineSimilarity(userVec, productVec));
      return sim.reduce((a, b) => a + b, 0) / userVectors.length;
    });

    const sortedIndices = similarities
      .map((sim, idx) => ({ sim, idx }))
      .sort((a, b) => b.sim - a.sim)
      .map(item => item.idx);

    const topN = 5;
    const recommendedProducts = [];
    for (const idx of sortedIndices) {
      if (recommendedProducts.length >= topN) break;
      recommendedProducts.push(availableProducts[idx]);
    }

    res.status(200).json(recommendedProducts);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
