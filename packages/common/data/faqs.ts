interface Faq {
  title: string
  content: string
}

const sharedFaqs: Faq[] = [
  {
    title: 'Why Smart Contracts?',
    content:
      'Smart contracts are self-executing digital agreements that can automate the process of verifying and enforcing the terms of a contract. They are based on blockchain technology, which provides a decentralized, secure and tamper-proof environment for recording and storing transactions. Smart contracts can be programmed to trigger specific actions based on predefined conditions, such as the completion of milestones, the receipt of payment, or the delivery of goods. By removing the need for intermediaries and manual processes, smart contracts can reduce costs, increase efficiency, and improve trust and transparency in business transactions.',
  },
  {
    title: 'How does Tru Market ensure the quality and authenticity of the products?',
    content:
      'Tru Market ensures the quality and authenticity of the products through its real-time traceability system. The platform inspects every operation of the that is held through it and documents the relevant information on the blockchain. This provides transparency and allows all parties to track the status of the product from source to destination. This prevents fraud and ensure that the product is of the highest quality.',
  },
  {
    title: 'How is Tru Market different from other online B2B marketplaces?',
    content:
      'Tru Market employs smart contracts with milestones that are tied to specific payments, providing buyers and sellers with a secure, transparent, and efficient way to do business. Tru Market inspects and documents each operation in real-time, ensuring traceability and transparency. Finally, the platform connects the operation with capital to execute the business operation.',
  },
]

const dealProductFaqs: Faq[] = [
  {
    title: 'What happens if there is a dispute between the buyer and supplier?',
    content:
      'Tru Market mitigates the risk of disputes by verifying the completion of each milestone and ensuring that the product meets the buyer requirements. In the case of a dispute, Tru Market offers a dispute resolution process to try and reach a satisfactory outcome for both parties. However, Tru Market is not responsible for any legal actions that may take place, as it is not the owner of the product.' 
  },
  {  
    title: 'What fees does Tru Market charge?',
    content:
      'Tru Market charges 8% of the FOB (Free on Board) value of the operations held by it. This fee covers the costs of using the platform and connecting with buyers and suppliers, real-time traceability of the operation, smart contract creation, and milestone-based financing.',
    
  },
]

const investmentProductFaqs: Faq[] = [
  {
    title: 'How do you ensure quality and what are your compensation policies?',
    content:
      'Payment terms and transactions are all set by agreement between Tridge and you. Delivery & payment settlement will be directly managed by Tridge.',
  },
]

export const faqs = {
  dealProductFaqs: [...sharedFaqs, ...dealProductFaqs],
  investmentProductFaqs: [...sharedFaqs, ...investmentProductFaqs],
}
