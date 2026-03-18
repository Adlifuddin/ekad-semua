import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface WeddingApprovedEmailProps {
  groomName: string;
  brideName: string;
  cardUrl: string;
  cardLink: string;
  editUrl: string;
}

const WeddingApproved = ({
  groomName,
  brideName,
  cardUrl,
  cardLink,
  editUrl,
}: WeddingApprovedEmailProps) => {
  return (
    <Html>
      <Head />
      <Body
        style={{
          fontFamily: "Helvetica, Arial, sans-serif",
          backgroundColor: "#f8f9fa",
          padding: "20px",
          margin: 0,
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "32px",
            maxWidth: "600px",
          }}
        >
          <Section style={{ padding: "20px 0" }}>
            <Text
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "20px",
                color: "#1a1a1a",
                textAlign: "center",
              }}
            >
              Your Wedding Card is Approved! ✨
            </Text>

            <Text
              style={{
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "20px",
                color: "#333333",
              }}
            >
              Hi there,
            </Text>

            <Text
              style={{
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "20px",
                color: "#333333",
              }}
            >
              Great news! Your wedding card for <strong>{groomName}</strong> &{" "}
              <strong>{brideName}</strong> has been approved and is now live! 🎊
            </Text>

            <Section
              style={{
                backgroundColor: "#f0fdf4",
                padding: "20px",
                borderRadius: "8px",
                marginBottom: "24px",
                borderLeft: "4px solid #10b981",
              }}
            >
              <Text
                style={{
                  fontSize: "14px",
                  color: "#666666",
                  margin: "0 0 8px 0",
                }}
              >
                <strong>Card URL:</strong> {cardUrl}
              </Text>
              <Text
                style={{
                  fontSize: "14px",
                  color: "#666666",
                  margin: "0",
                }}
              >
                <strong>Status:</strong>{" "}
                <span style={{ color: "#10b981", fontWeight: "600" }}>
                  Approved
                </span>
              </Text>
            </Section>

            <Text
              style={{
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "24px",
                color: "#333333",
              }}
            >
              You can now share your beautiful wedding invitation with your
              guests. Your card is accessible at the link below, and you can
              make edits anytime using your edit link.
            </Text>

            <div style={{ marginBottom: "16px" }}>
              <Button
                href={cardLink}
                style={{
                  backgroundColor: "#10b981",
                  color: "#ffffff",
                  padding: "12px 28px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: "600",
                  display: "inline-block",
                  textAlign: "center",
                  marginBottom: "12px",
                  width: "100%",
                }}
              >
                View Your Wedding Card
              </Button>
            </div>

            <div>
              <Button
                href={editUrl}
                style={{
                  backgroundColor: "#0ea5e9",
                  color: "#ffffff",
                  padding: "12px 28px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: "600",
                  display: "inline-block",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                Edit Your Card
              </Button>
            </div>

            <Text
              style={{
                marginTop: "32px",
                fontSize: "14px",
                color: "#666666",
                lineHeight: "1.5",
                padding: "16px",
                backgroundColor: "#fef3c7",
                borderRadius: "6px",
                borderLeft: "4px solid #f59e0b",
              }}
            >
              <strong>Important:</strong> Keep your edit link secure. Anyone
              with this link can modify your wedding card.
            </Text>

            <Text
              style={{
                marginTop: "24px",
                fontSize: "14px",
                color: "#666666",
                lineHeight: "1.5",
              }}
            >
              If you have any questions or need assistance, please don&apos;t
              hesitate to contact our support team.
            </Text>

            <Text
              style={{
                marginTop: "20px",
                paddingTop: "20px",
                borderTop: "1px solid #e5e7eb",
                fontSize: "12px",
                color: "#999999",
                textAlign: "center",
              }}
            >
              © {new Date().getFullYear()} My eKad. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default WeddingApproved;
