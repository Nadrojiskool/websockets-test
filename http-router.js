const { AssetLayer } = require('dubby-sdk-test');

const assetlayer = new AssetLayer({
  appSecret: process.env.ASSETLAYER_APP_SECRET,
});

function abortHandler() {
  res.aborted = true;
};

exports.allHandler = async (res, req) => {
  res.onAborted(abortHandler);

  try {
    const app = await assetlayer.apps.getApp('633b30ca09d1acacd0c50df4');

    console.log('app', app);

    return res.writeStatus('200 OK').writeHeader('IsExample', 'Yes').end(JSON.stringify(app));
  }
  catch (e) {
    console.log('err', e)
  }

  res.writeStatus('200 OK').writeHeader('IsExample', 'Yes').end('Hello world!');
}

exports.ballsHandler = (res, req) => {
  res.writeStatus('200 OK').writeHeader('IsBalls', 'Yes').end('Hello balls!');
}