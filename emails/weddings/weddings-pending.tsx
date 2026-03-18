import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface WeddingPendingEmailProps {
  groomName: string;
  brideName: string;
  cardUrl: string;
  paymentRefId: string;
  editUrl: string;
}

const WeddingPending = ({
  groomName,
  brideName,
  cardUrl,
  paymentRefId,
  editUrl,
}: WeddingPendingEmailProps) => {
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
              Wedding Card Request Received! 🎉
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
              Thank you for creating a wedding card for{" "}
              <strong>{groomName}</strong> & <strong>{brideName}</strong>!
              <br />
              Your request has been successfully received and is currently
              pending approval.
            </Text>

            <Section
              style={{
                backgroundColor: "#f0f9ff",
                padding: "20px",
                borderRadius: "8px",
                marginBottom: "24px",
                borderLeft: "4px solid #0ea5e9",
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
                  margin: "0 0 8px 0",
                }}
              >
                <strong>Payment Reference:</strong> {paymentRefId}
              </Text>
              <Text
                style={{
                  fontSize: "14px",
                  color: "#666666",
                  margin: "0",
                }}
              >
                <strong>Status:</strong> Pending Approval
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
              Our team will review your submission and approve your card
              shortly. Once approved, you&apos;ll receive another email with
              your card link and edit access.
            </Text>

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
              }}
            >
              View Your Card Details
            </Button>

            <Text
              style={{
                marginTop: "32px",
                fontSize: "14px",
                color: "#666666",
                lineHeight: "1.5",
              }}
            >
              If you have any questions, please don&apos;t hesitate to contact
              our support team.
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

export default WeddingPending;
