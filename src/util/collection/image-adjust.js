export const imageAdjust = (pkId) => {
	const flipArray = [
		2, 9, 18, 28, 38, 40, 41, 48, 51, 53, 64, 68, 78, 89, 96, 100, 106, 107, 114, 118, 138, 146,
		147, 155, 169, 173, 183, 190, 194, 197, 200, 210, 211, 213, 222, 233, 241, 242, 247, 250,
		259, 268, 269, 271, 282, 289, 293, 299, 303, 317, 364, 378, 383, 393, 403, 408, 409, 446,
		471, 477, 479, 482, 483, 488, 496, 498, 515, 522, 530, 532, 538, 552, 575, 593, 605, 617,
		630, 640, 642, 643, 656, 668, 670, 678, 683, 686, 696, 705, 708, 716, 723, 724, 728, 729,
		735, 750, 752, 758, 767, 772, 776, 785, 788, 789, 791, 808, 810, 814, 819, 820, 821, 823,
		825, 827, 831, 832, 835, 838, 844, 845, 850, 854, 862, 863, 864, 868, 872, 873, 876, 878,
		888, 893, 895,
	];
	const leftArray = [
		21, 58, 66, 68, 83, 84, 85, 86, 96, 102, 104, 106, 115, 123, 126, 127, 131, 148, 150, 154,
		156, 160, 162, 163, 170, 174, 179, 181, 186, 194, 195, 224, 239, 241, 256, 265, 271, 293,
		299, 300, 302, 337, 357, 359, 400, 420, 423, 474, 477, 479, 509, 532, 552, 580, 624, 645,
		648, 653, 656, 659, 670, 687, 694, 702, 706, 707, 717, 720, 723, 736, 739, 740, 753, 755,
		757, 785, 786, 787, 788, 792, 804, 813, 852, 858, 876, 895,
	];
	const rightArray = [
		2, 18, 26, 43, 60, 147, 197, 264, 267, 282, 303, 317, 374, 483, 484, 489, 496, 617, 643,
		663, 668, 691, 695, 697, 718, 724, 729, 735, 750, 814, 820, 821, 823, 827, 828, 832, 834,
		836, 844, 863, 880, 883, 888, 889, 890, 894,
	];
	const classArray = [];
	const smallerArray = [
		92, 100, 101, 102, 114, 129, 132, 137, 179, 265, 270, 304, 328, 337, 353, 357, 363, 420,
		517, 656, 696, 702, 883, 882,
	];
	const largerArray = [
		75, 89, 232, 239, 249, 250, 264, 376, 486, 658, 663, 724, 740, 834, 865, 894,
	];
	const upArray = [75, 89, 232, 239, 264, 329, 376, 433, 486, 658, 724, 729, 740, 834, 865];
	const downArray = [114, 160, 174, 179, 194, 303, 304, 328];
	if (flipArray.includes(pkId)) classArray.push('flip-img');
	if (leftArray.includes(pkId)) classArray.push('lt-img');
	if (rightArray.includes(pkId)) classArray.push('rt-img');
	if (smallerArray.includes(pkId)) classArray.push('sml-img');
	if (largerArray.includes(pkId)) classArray.push('lrg-img');
	if (upArray.includes(pkId)) classArray.push('up-img');
	if (downArray.includes(pkId)) classArray.push('dwn-img');
	return classArray;
};
