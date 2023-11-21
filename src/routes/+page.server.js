

export async function load({ locals }) {
	let leaderboard = []
    let records = await locals.pb.collection('solutions').getList(1, 5, {
        sort: '-length',
    });
    let items = records.items
    items.forEach(item => {
        leaderboard.push({username: item.username, longestWord: item.longestWord, length: item.length})
    });
    console.log(leaderboard)
    return {
      props: {
        leaderboard: leaderboard,
      },
    };
  }
  