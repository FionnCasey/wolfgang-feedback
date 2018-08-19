import moment from 'moment';

const sumVotes = votes => votes.reduce((total, vote) => total + vote.value, 0) || 0;

const countVotes = votes => {
	let vals = { up: 0, down: 0, score: 0, numVotes: 0 };
	return votes.reduce((total, vote) => {
		vote.value > 0 ? total.up += vote.value : total.down -= vote.value;
		total.score += vote.value;
		total.numVotes++;
		return total;
	}, vals) || vals;
};

const sortModes = {
	none: (a, b) => 0,

	byScoreDescending: (a, b) => sumVotes(a._votes) > sumVotes(b._votes) ? 1 : -1,
	byScoreAscending: (a, b) => sumVotes(a._votes) < sumVotes(b._votes) ? 1 : -1,

	byCommentsDescending: (a, b) => countChildren(a._children) > countChildren(b._children) ? 1 : -1,
	byCommentsAscending: (a, b) => countChildren(a._children) < countChildren(b._children) ? 1 : -1
};

const filterModes = {
	none: n => true,

	hasPositiveScore: n => sumVotes(n._votes) > 0,
	hasNegativeScore: n => sumVotes(n._votes) < 0,

	createdLastWeek: n => moment(n.createdAt).isAfter(moment().subtract(7, 'days')),
	createdLastMonth: n => moment(n.createdAt).isAfter(moment().subtract(1, 'month')),
};


const countChildren = root => {
  let total = root.length;
  total += root.reduce((a, n) => a + countChildren(n._children), 0);
  return total;
};

export {
	sumVotes,
	countVotes,
	sortModes,
	countChildren,
	filterModes
};
