import BenefitsStyled from './Benefits.styled'

const benefitsData = [
  {
    icon: "delivery_truck_bolt",
    title: "FAST",
    subtitle: "DELIVERY"
  },
  {
    icon: "shield_locked",
    title: "SECURE",
    subtitle: "SHOPPING"
  },
  {
    icon: "support_agent",
    title: "CUSTOMER",
    subtitle: "SUPPORT"
  },
  {
    icon: "nest_clock_farsight_analog",
    title: "EASY",
    subtitle: "RETURNS"
  }
]


const Benefits = () => {
  return (
    <BenefitsStyled.Container>
      <BenefitsStyled.Grid>
        {benefitsData.map((benefit, index) => (
          <BenefitsStyled.Item key={index}>
            <BenefitsStyled.Icon className="material-symbols-outlined">
              {benefit.icon}
            </BenefitsStyled.Icon>
            <BenefitsStyled.Content>
              <BenefitsStyled.Title>{benefit.title}</BenefitsStyled.Title>
              <BenefitsStyled.Subtitle>{benefit.subtitle}</BenefitsStyled.Subtitle>
            </BenefitsStyled.Content>
          </BenefitsStyled.Item>
        ))}
      </BenefitsStyled.Grid>
    </BenefitsStyled.Container>
  )
}

export default Benefits