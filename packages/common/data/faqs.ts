interface Faq {
  title: string
  content: string
}

const sharedFaqs: Faq[] = [
  {
    title: 'How do payment and transaction work?',
    content:
      'Payment terms and transactions are all set by agreement between Tridge and you. Delivery & payment settlement will be directly managed by Tridge.',
  },
  {
    title: 'Does Tridge own the farms or packing houses?',
    content:
      'Payment terms and transactions are all set by agreement between Tridge and you. Delivery & payment settlement will be directly managed by Tridge.',
  },
  {
    title: 'Do you sell in DDP / do you do customs clearance?',
    content:
      'Payment terms and transactions are all set by agreement between Tridge and you. Delivery & payment settlement will be directly managed by Tridge.',
  },
]

const dealProductFaqs: Faq[] = [
  {
    title: 'How do you ensure quality and what are your compensation policies?',
    content:
      'Payment terms and transactions are all set by agreement between Tridge and you. Delivery & payment settlement will be directly managed by Tridge.',
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
