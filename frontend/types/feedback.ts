export type ClassGroup = "5-7" | "8-10" | "college";

export interface QuestionValidation {
	keys: string[];
	label: string;
}

export interface ResponseCounts5_7 {
	// Pre-Survey
	q1_mobile: number;
	q1_tablet: number;
	q1_laptop: number;
	q1_other: number;
	q2_less1: number;
	q2_1to3: number;
	q2_4to6: number;
	q2_more6: number;
	q4_knowBetter: number;
	q4_sometimes: number;
	// Post-Survey
	p1_diary: number;
	p1_noChange: number;
	p2_setLimits: number;
	p2_keepScrolling: number;
	p2_notSure: number;
	p3_pauseCheck: number;
	p3_justDownload: number;
	p4_doneSharing: number;
	p4_mightStill: number;
	p4_alreadySafe: number;
}

export interface ResponseCounts8_10 {
	// Pre-Survey
	q1_acceptKnown: number;
	q1_addNew: number;
	q1_ignoreSometimes: number;
	q2_unique: number;
	q2_sameAll: number;
	q2_simple: number;
	q3_never: number;
	q3_sometimes: number;
	q3_withoutThinking: number;
	q4_secureApp: number;
	q4_parentPhone: number;
	q4_dontCheck: number;
	// Post-Survey
	p1_dontAccept: number;
	p1_mightAccept: number;
	p1_askAdult: number;
	p2_strong2FA: number;
	p2_tryLater: number;
	p2_complicated: number;
	p3_neverAgain: number;
	p3_stillLearning: number;
	p3_notBigDeal: number;
	p4_doubleCheck: number;
	p4_askTrusted: number;
	p4_sameBefore: number;
}

export interface ResponseCountsCollege {
	// Pre-Survey
	q1_neverShare: number;
	q1_sometimesAvoid: number;
	q1_feelsNormal: number;
	q2_blockReport: number;
	q2_ignore: number;
	q2_clickCuriosity: number;
	q3_always: number;
	q3_sometimes: number;
	q3_rarelyNever: number;
	q4_keepPrivate: number;
	q4_postCarefully: number;
	q4_postEverything: number;
	// Post-Survey
	p1_verifyBefore: number;
	p1_extraCareful: number;
	p1_stillUnsure: number;
	p2_reportInform: number;
	p2_ignore: number;
	p2_notBigDeal: number;
	p3_secureSettings: number;
	p3_startSlowly: number;
	p3_fineAsIs: number;
	p4_morePrivate: number;
	p4_lessPersonal: number;
	p4_noChange: number;
}

export interface FeedbackData {
	presentationId: string;
	totalStudents: number;
	responseCounts:
		| ResponseCounts5_7
		| ResponseCounts8_10
		| ResponseCountsCollege;
	topApps?: string[];
	classGroup: ClassGroup;
}