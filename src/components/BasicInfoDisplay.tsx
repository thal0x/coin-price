import { TELEGRAM_GROUP_LINK, TOKEN_SYMBOL, TRANSACTION_INFO_LINK } from "@/constants";

const BasicInfoDisplay = () => {
  const proofLink = "https://www.mintscan.io/neutron/tx/0E5CF5A7853FD31EEAC06FB666CBE73BC11453ED2DCA38FC7FA457476909A996?height=5201462";

  const linkStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f8f9fa',
    padding: '2px 4px',
    borderRadius: '4px',
  };

  const emojiStyle = {
    fontSize: '24px', // Adjust size as needed
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Getting Started</h2>
      
      <div>
        <span style={emojiStyle} role="img" aria-label="money">1️⃣</span>
        <p>
          💰 To get ${TOKEN_SYMBOL}, visit&nbsp;
          <a href={TRANSACTION_INFO_LINK} target="_blank" rel="noreferrer" style={linkStyle}>
            ibc.fun
          </a>.
        </p>
      </div>

      <div>
        <span style={emojiStyle} role="img" aria-label="telegram">2️⃣</span>
        <p>
          🔗 Join the Telegram
          <a href={TELEGRAM_GROUP_LINK} target="_blank" rel="noreferrer" style={linkStyle}>
            here
          </a>.
        </p>
      </div>

      <div>
        <span style={emojiStyle} role="img" aria-label="frog">3️⃣</span>
        <p>
          🐸 The pool was seeded with the total supply (21M {TOKEN_SYMBOL}) and $NTRN. Then, the LP tokens were burned. Here&apos;s the&nbsp;
          <a href={proofLink} target="_blank" rel="noreferrer" style={linkStyle}>
            proof
          </a>!
        </p>
      </div>
    </div>
  );
};

export default BasicInfoDisplay;
