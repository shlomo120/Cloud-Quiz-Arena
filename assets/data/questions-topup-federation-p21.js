/**
 * questions-topup-federation-p21.js — Phase 21 coverage top-up: Federation (7 questions).
 * Deepens the Advanced slice of the federation domain. Registers itself
 * via CQA.data.registerPack(). Data only.
 */

CQA.data.registerPack({
  id: "topup-federation-p21",
  label: "Identity Federation — Phase 21 Top-up",
  questions: [
    {
      id: "p21-fed-001",
      providers: ["neutral"],
      domains: ["federation", "identity"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "When a user signs in through a federated identity provider for the very first time, what does 'just-in-time (JIT) provisioning' do?",
      question_he:
        "כאשר משתמש מתחבר דרך ספק זהות מאוחד (federated IdP) בפעם הראשונה, מה עושה 'הקצאה בזמן אמת' (JIT provisioning)?",
      options: [
        "It automatically creates a local user account in the relying application using attributes from the federated sign-in",
        "It forces the user to complete multi-factor authentication before any account is created",
        "It caches the SAML assertion so the next login can skip the identity provider entirely",
        "It rotates the federation signing certificate the first time a new user authenticates",
      ],
      options_he: [
        "היא יוצרת אוטומטית חשבון משתמש מקומי באפליקציה הצורכת, תוך שימוש במאפיינים (attributes) מתהליך ההתחברות המאוחד",
        "היא מכריחה את המשתמש להשלים אימות רב-שלבי (MFA) לפני שנוצר חשבון כלשהו",
        "היא שומרת במטמון (cache) את ה-SAML assertion כך שההתחברות הבאה תדלג לגמרי על ספק הזהות",
        "היא מסובבת (rotate) את תעודת החתימה (signing certificate) של הפדרציה בפעם הראשונה שמשתמש חדש מתאמת",
      ],
      correctAnswer: 0,
      explanation:
        "JIT provisioning means the relying application creates a new local account automatically the first time it receives a valid federated sign-in, populating fields like name and email from the claims/attributes in the token or assertion. It has nothing to do with MFA enforcement, certificate rotation, or caching assertions — those are separate concerns. The risk to watch for is over-provisioning: if the claims mapping is too permissive, JIT can create accounts with more access than intended.",
      explanation_he:
        "JIT provisioning אומר שהאפליקציה הצורכת יוצרת חשבון מקומי חדש אוטומטית בפעם הראשונה שהיא מקבלת התחברות מאוחדת תקינה, תוך מילוי שדות כמו שם ואימייל מתוך ה-claims/attributes בטוקן או ב-assertion. לזה אין קשר לאכיפת MFA, לסיבוב תעודות, או לשמירת assertions במטמון - אלו נושאים נפרדים. הסיכון לתשומת לב הוא הקצאת יתר (over-provisioning): אם מיפוי ה-claims מדי מתירני, JIT עלול ליצור חשבונות עם יותר הרשאות מהמתוכנן.",
      resourceTitle: "Microsoft Entra B2B collaboration overview",
      resourceUrl:
        "https://learn.microsoft.com/entra/external-id/what-is-b2b",
      keywords: ["jit provisioning", "federation", "sso", "account creation"],
      tooltipTerms: ["Federation", "SSO"],
    },
    {
      id: "p21-fed-002",
      providers: ["neutral"],
      domains: ["federation", "identity"],
      difficulty: "beginner",
      type: "true-false",
      question:
        "If the certificate used to sign SAML assertions at the identity provider expires without being rotated, federated sign-ins can start failing even though nothing changed in the relying application's configuration.",
      question_he:
        "אם תעודת החתימה (certificate) המשמשת לחתום על SAML assertions אצל ספק הזהות פגה מבלי שסובבו אותה, התחברויות מאוחדות עלולות להתחיל להיכשל למרות שדבר לא השתנה בקונפיגורציה של האפליקציה הצורכת.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: true,
      explanation:
        "The relying party validates the SAML assertion's signature using the IdP's certificate published in the federation metadata. If that certificate expires, signature validation fails and sign-ins break, even though the relying application's own settings never changed. This is why certificate rotation needs to be planned and metadata refreshed proactively, not treated as a one-time setup step.",
      explanation_he:
        "הצד הצורך (relying party) מאמת את החתימה של ה-SAML assertion באמצעות תעודת ה-IdP המפורסמת ב-metadata של הפדרציה. אם התעודה הזו פגה, אימות החתימה נכשל וההתחברויות נשברות, למרות שההגדרות של האפליקציה הצורכת עצמה לא השתנו כלל. לכן סיבוב תעודות צריך להיות מתוכנן וה-metadata מרוענן באופן יזום, ולא להיות מטופל כצעד הגדרה חד-פעמי.",
      resourceTitle: "SAML V2.0 Metadata specification",
      resourceUrl:
        "https://docs.oasis-open.org/security/saml/v2.0/saml-metadata-2.0-os.pdf",
      keywords: ["certificate rotation", "saml", "federation metadata"],
      tooltipTerms: ["SAML", "Federation"],
    },
    {
      id: "p21-fed-003",
      providers: ["neutral"],
      domains: ["federation", "identity"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "An application receives a JWT from an OIDC identity provider and only base64-decodes it to read the claims before granting access. What is the main security gap in this approach?",
      question_he:
        "אפליקציה מקבלת JWT מספק זהות OIDC ורק מפענחת אותו ב-base64 כדי לקרוא את ה-claims לפני מתן גישה. מה הפער האבטחתי המרכזי בגישה הזו?",
      options: [
        "It never verifies the token's signature, issuer, audience, and expiration, so a forged or repurposed token could be accepted as valid",
        "Base64 decoding is computationally too slow for production authentication flows",
        "JWTs cannot contain custom claims, so the application will be missing required user attributes",
        "OIDC tokens are encrypted and therefore cannot be base64-decoded at all",
      ],
      options_he: [
        "היא אף פעם לא מאמתת את חתימת הטוקן, את ה-issuer, את ה-audience ואת תאריך התפוגה, כך שטוקן מזויף או ממוחזר עלול להתקבל כתקין",
        "פענוח base64 איטי מדי מבחינה חישובית לתהליכי אימות בסביבת ייצור",
        "טוקני JWT לא יכולים להכיל claims מותאמים אישית, כך שלאפליקציה יחסרו מאפייני משתמש נדרשים",
        "טוקני OIDC מוצפנים ולכן לא ניתן לפענח אותם ב-base64 בכלל",
      ],
      correctAnswer: 0,
      explanation:
        "Decoding a JWT only reads its payload — it proves nothing about authenticity. Proper validation requires checking the cryptographic signature against the IdP's public key, confirming the issuer (iss) matches the expected trusted IdP, confirming the audience (aud) matches this application, and rejecting expired tokens (exp). Skipping any of these lets an attacker present a token issued for a different app, a tampered token, or an expired one, and have it accepted anyway.",
      explanation_he:
        "פענוח JWT קורא רק את ה-payload שלו - הוא לא מוכיח דבר לגבי האותנטיות שלו. אימות תקין דורש בדיקת החתימה הקריפטוגרפית מול המפתח הציבורי של ה-IdP, אימות שה-issuer (iss) תואם ל-IdP המהימן הצפוי, אימות שה-audience (aud) תואם לאפליקציה הזו, ודחיית טוקנים שפג תוקפם (exp). דילוג על אחד מאלה מאפשר לתוקף להציג טוקן שהונפק לאפליקציה אחרת, טוקן שעבר שינוי, או טוקן שפג תוקפו - ולגרום לו להתקבל בכל זאת.",
      resourceTitle: "OpenID Connect Core 1.0 - ID Token validation",
      resourceUrl: "https://openid.net/specs/openid-connect-core-1_0.html",
      keywords: ["jwt validation", "oidc", "issuer", "audience", "signature"],
      tooltipTerms: ["OIDC", "SSO"],
    },
    {
      id: "p21-fed-004",
      providers: ["neutral"],
      domains: ["federation", "security"],
      difficulty: "intermediate",
      type: "true-false",
      question:
        "Because refresh tokens typically live much longer than access tokens, a stolen refresh token can be a higher-value target for an attacker than a stolen access token.",
      question_he:
        "מכיוון שטוקני refresh בדרך כלל חיים הרבה יותר זמן מטוקני access, טוקן refresh גנוב עלול להיות מטרה בעלת ערך גבוה יותר עבור תוקף מאשר טוקן access גנוב.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: true,
      explanation:
        "Access tokens are short-lived and expire quickly, limiting the damage window if leaked. Refresh tokens are designed to persist for days, weeks, or longer so a client doesn't need to re-authenticate constantly, which means a stolen refresh token can be used to mint fresh access tokens repeatedly until it is detected and revoked. This is why refresh token theft detection, rotation on use, and revocation lists matter so much in federated architectures.",
      explanation_he:
        "טוקני access הם קצרי חיים ופגי תוקף מהר, מה שמגביל את חלון הנזק אם דלפו. טוקני refresh מתוכננים להתקיים ימים, שבועות או יותר כדי שהלקוח לא יצטרך להתאמת שוב ושוב, מה שאומר שטוקן refresh גנוב יכול לשמש להנפקת טוקני access חדשים שוב ושוב עד שהוא מתגלה ומבוטל. לכן זיהוי גניבת refresh token, סיבוב (rotation) בשימוש, ורשימות ביטול (revocation) חשובים כל כך בארכיטקטורות פדרציה.",
      resourceTitle: "Microsoft identity platform refresh tokens",
      resourceUrl:
        "https://learn.microsoft.com/entra/identity-platform/refresh-tokens",
      keywords: ["refresh token", "token lifetime", "revocation", "federation"],
      tooltipTerms: ["OIDC", "IAM Role"],
    },
    {
      id: "p21-fed-005",
      providers: ["neutral"],
      domains: ["federation", "governance"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "Organization A federates with Organization B, and Organization B in turn federates with Organization C using a transitive trust configuration. What is the key risk this multi-hop federation chain introduces for Organization A?",
      question_he:
        "ארגון A מקיים פדרציה עם ארגון B, וארגון B מצדו מקיים פדרציה עם ארגון C תוך שימוש בהגדרת אמון טרנזיטיבי (transitive trust). מהו הסיכון המרכזי ששרשרת פדרציה רב-שלבית זו מציגה עבור ארגון A?",
      options: [
        "Organization A may effectively be extending trust to Organization C's users and security posture without having evaluated them directly",
        "Organization A's users will be unable to authenticate because SAML does not support more than one federation hop",
        "Organization A's IdP will automatically encrypt all assertions destined for Organization C",
        "Multi-hop federation always doubles the token lifetime for every downstream organization",
      ],
      options_he: [
        "ארגון A עלול למעשה להרחיב אמון למשתמשי ארגון C ולעמדת האבטחה שלו, מבלי שהוערכו ישירות",
        "משתמשי ארגון A לא יוכלו להתאמת כי SAML לא תומך ביותר מקפיצת פדרציה (hop) אחת",
        "ה-IdP של ארגון A יצפין אוטומטית את כל ה-assertions המיועדים לארגון C",
        "פדרציה רב-שלבית תמיד מכפילה את משך חיי הטוקן עבור כל ארגון במורד השרשרת",
      ],
      correctAnswer: 0,
      explanation:
        "Transitive trust chains mean that if A trusts B, and B trusts C, A can end up implicitly relying on C's identity assurance, security controls, and vetting practices even though A never evaluated Organization C directly. This is a governance blind spot, not a protocol limitation — SAML and OIDC both support arbitrary numbers of hops technically. The real defense is limiting or explicitly reviewing transitive trust rather than assuming a partner's downstream federations are equally trustworthy.",
      explanation_he:
        "שרשראות אמון טרנזיטיבי אומרות שאם A סומך על B, ו-B סומך על C, A עלול למעשה להסתמך במרומז על אבטחת הזהויות, בקרות האבטחה ותהליכי הבדיקה של C, למרות ש-A מעולם לא העריך ישירות את ארגון C. זו נקודה עיוורת בממשל (governance), לא מגבלה פרוטוקולרית - גם SAML וגם OIDC תומכים טכנית במספר בלתי מוגבל של קפיצות. ההגנה האמיתית היא הגבלה או בדיקה מפורשת של אמון טרנזיטיבי, ולא הנחה שהפדרציות במורד השרשרת של שותף אמינות באותה מידה.",
      resourceTitle: "Microsoft Entra cross-tenant access settings",
      resourceUrl:
        "https://learn.microsoft.com/entra/external-id/cross-tenant-access-overview",
      keywords: ["transitive trust", "multi-hop federation", "trust chain"],
      tooltipTerms: ["Federation", "Entra ID"],
    },
    {
      id: "p21-fed-006",
      providers: ["neutral"],
      domains: ["federation", "security"],
      difficulty: "advanced",
      type: "multi-select",
      question:
        "Which of the following controls help protect a SAML-based federation flow against assertion replay attacks, where an attacker captures a valid assertion and resubmits it later? (Select all that apply.)",
      question_he:
        "אילו מהבקרות הבאות מסייעות להגן על תהליך פדרציה מבוסס SAML מפני התקפות replay של assertions, שבהן תוקף לוכד assertion תקין ושולח אותו שוב מאוחר יותר? (בחר את כל התשובות הרלוונטיות.)",
      options: [
        "A short assertion validity window (NotBefore/NotOnOrAfter conditions) so an old assertion is rejected as expired",
        "Audience restriction so an assertion issued for one relying party cannot be replayed against another",
        "Tracking assertion IDs already consumed so the same assertion cannot be accepted twice",
        "Increasing the length of the user's password to make assertions harder to guess",
      ],
      options_he: [
        "חלון תוקף קצר לאסרציה (תנאי NotBefore/NotOnOrAfter) כך שאסרציה ישנה נדחית כפגת תוקף",
        "הגבלת audience כך שאסרציה שהונפקה עבור צד צורך אחד לא ניתנת ל-replay מול צד אחר",
        "מעקב אחר מזהי assertion (assertion IDs) שכבר נצרכו כך שאותה אסרציה לא תתקבל פעמיים",
        "הארכת אורך הסיסמה של המשתמש כדי להקשות על ניחוש assertions",
      ],
      correctAnswer: [0, 1, 2],
      explanation:
        "Replay defenses in SAML rely on the assertion's built-in time window (NotBefore/NotOnOrAfter) rejecting stale assertions, audience restriction ensuring an assertion can only be consumed by its intended relying party, and one-time-use tracking of assertion IDs so a captured assertion can't be resubmitted successfully even within its valid window. Password length is unrelated — SAML assertions aren't guessed like passwords, they're captured and resubmitted, so the defenses must target the assertion's validity and uniqueness rather than credential strength.",
      explanation_he:
        "הגנות replay ב-SAML מסתמכות על חלון הזמן המובנה של האסרציה (NotBefore/NotOnOrAfter) שדוחה אסרציות ישנות, הגבלת audience שמבטיחה שאסרציה תיצרך רק על ידי הצד הצורך המיועד לה, ומעקב שימוש-חד-פעמי אחר מזהי אסרציה כך שאסרציה שנלכדה לא תוכל להישלח שוב בהצלחה אפילו בתוך חלון התוקף שלה. אורך הסיסמה לא רלוונטי - אסרציות SAML לא מנוחשות כמו סיסמאות, הן נלכדות ונשלחות מחדש, ולכן ההגנות חייבות להתמקד בתוקף ובייחודיות של האסרציה ולא בחוזק האישורים.",
      resourceTitle: "SAML V2.0 Technical Overview - security considerations",
      resourceUrl:
        "https://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html",
      keywords: ["saml replay", "assertion expiry", "audience restriction"],
      tooltipTerms: ["SAML"],
    },
    {
      id: "p21-fed-007",
      providers: ["neutral"],
      domains: ["federation", "identity"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A company enables B2B guest access so users from a partner organization can federate in and access shared resources. The claims mapping is configured to pass through every group claim from the partner's IdP unmodified. What is the most likely consequence?",
      question_he:
        "חברה מפעילה גישת אורח B2B (B2B guest access) כך שמשתמשים מארגון שותף יכולים להתחבר בפדרציה ולגשת למשאבים משותפים. מיפוי ה-claims מוגדר להעביר כל group claim מה-IdP של השותף ללא שינוי. מהי התוצאה הסבירה ביותר?",
      options: [
        "Guest users could inherit access tied to group names or IDs that happen to collide with internal groups, resulting in unintended over-provisioning of access",
        "The federation will fail immediately because group claims are not supported in cross-tenant scenarios",
        "The partner's users will be unable to sign in at all since group claims require MFA to be disabled",
        "Passing through group claims automatically encrypts the resulting access token",
      ],
      options_he: [
        "משתמשי אורח עלולים לרשת גישה הקשורה לשמות או מזהי קבוצות שבמקרה מתנגשים עם קבוצות פנימיות, מה שגורם להקצאת יתר לא מכוונת של גישה",
        "הפדרציה תיכשל מיד כי group claims לא נתמכים בתרחישי cross-tenant",
        "משתמשי השותף לא יוכלו להתחבר כלל, כי group claims דורשים כיבוי של MFA",
        "העברת group claims באופן שקוף מצפינה אוטומטית את טוקן הגישה המתקבל",
      ],
      correctAnswer: 0,
      explanation:
        "When claims mapping blindly forwards group claims from an external IdP without translating or filtering them, an authorization system that grants access based on group name or ID matching can be fooled into treating a partner's group as equivalent to an internal one, silently over-granting access. This is a cross-tenant trust boundary problem, not a protocol limitation — group claims work fine technically across tenants, the danger is in how the relying application interprets them without validation or explicit mapping rules.",
      explanation_he:
        "כאשר מיפוי claims מעביר באופן עיוור group claims מ-IdP חיצוני מבלי לתרגם או לסנן אותם, מערכת הרשאות שמעניקה גישה על בסיס התאמת שם או מזהה קבוצה עלולה להוליך שולל ולהתייחס לקבוצה של השותף כשקולה לקבוצה פנימית, ולהעניק גישה יתרה בשקט. זו בעיית גבול אמון בין ארגונים (cross-tenant), לא מגבלה פרוטוקולרית - group claims עובדים טכנית טוב לחלוטין בין tenants, הסכנה היא באופן שבו האפליקציה הצורכת מפרשת אותם ללא אימות או כללי מיפוי מפורשים.",
      resourceTitle:
        "Microsoft Entra claims mapping policies for federation",
      resourceUrl:
        "https://learn.microsoft.com/entra/identity-platform/reference-claims-mapping-policy-type",
      keywords: ["claims mapping", "b2b guest access", "cross-tenant", "over-provisioning"],
      tooltipTerms: ["Federation", "Entra ID", "IAM Role"],
    },
  ],
});
