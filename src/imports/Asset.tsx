import imgCorpModuleDisplaySNome from "figma:asset/ece298d0ec2c16f10310d45724b276a6035cb503.png";

function AreaFocus() {
  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(0,71,187,0.5)] h-[300px] left-[calc(50%-6px)] top-1/2 w-[400px]"
      data-name="Area Focus"
    />
  );
}

function AreaLoghiPremi() {
  return (
    <div
      className="-translate-x-1/2 absolute bg-[rgba(239,100,147,0.5)] bottom-[5px] h-[92px] left-1/2 w-[768px]"
      data-name="Area Loghi Premi"
    />
  );
}

function CorpModuleDisplaySNome() {
  return (
    <div
      className="absolute bg-size-[128px_128px] bg-top-left h-[300px] left-[3072px] overflow-clip top-[431.5px] w-[768px]"
      data-name="CorpModuleDisplay-S-Nome"
      style={{
        backgroundImage: `url('${imgCorpModuleDisplaySNome}')`,
      }}
    >
      <AreaFocus />
      <AreaLoghiPremi />
    </div>
  );
}

function AreaFocus1() {
  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(0,71,187,0.5)] h-[315px] left-1/2 top-1/2 w-[376px]"
      data-name="Area Focus"
    />
  );
}

function CorpCardPictureNome() {
  return (
    <div
      className="absolute bg-size-[64px_64px] bg-top-left h-[315px] left-[2369.5px] overflow-clip top-[6207.5px] w-[636px]"
      data-name="CorpCardPicture-nome-"
      style={{
        backgroundImage: `url('${imgCorpModuleDisplaySNome}')`,
      }}
    >
      <AreaFocus1 />
    </div>
  );
}

function AreaFocus2() {
  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(0,71,187,0.5)] h-[300px] left-[calc(50%-6px)] top-1/2 w-[400px]"
      data-name="Area Focus"
    />
  );
}

function AreaLoghiPremi1() {
  return (
    <div
      className="-translate-x-1/2 absolute bg-[rgba(239,100,147,0.5)] bottom-[5px] h-[92px] left-1/2 w-[768px]"
      data-name="Area Loghi Premi"
    />
  );
}

function CorpIntroPhotoSNome() {
  return (
    <div
      className="absolute bg-size-[128px_128px] bg-top-left h-[300px] left-[1790px] overflow-clip top-[416.5px] w-[768px]"
      data-name="CorpIntroPhoto-S-Nome"
      style={{
        backgroundImage: `url('${imgCorpModuleDisplaySNome}')`,
      }}
    >
      <AreaFocus2 />
      <AreaLoghiPremi1 />
    </div>
  );
}

function AreaLoghiPremi2() {
  return (
    <div
      className="-translate-x-1/2 absolute bg-[rgba(239,100,147,0.5)] bottom-[20px] h-[92px] left-1/2 w-[320px]"
      data-name="Area Loghi Premi"
    />
  );
}

function AreaFocus3() {
  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(0,71,187,0.5)] h-[470px] left-[calc(50%+159.5px)] overflow-clip top-[calc(50%+0.05px)] w-[418px]"
      data-name="Area Focus"
    >
      <AreaLoghiPremi2 />
    </div>
  );
}

function AreaLoghiPremi3() {
  return (
    <div
      className="-translate-x-1/2 absolute bg-[#eedc00] bottom-[-0.05px] h-[470px] left-[calc(50%-211.5px)] w-[324px]"
      data-name="Area Loghi Premi"
    />
  );
}

function CorpModuleIntroPhotoMNomeFileAlto() {
  return (
    <div
      className="absolute bg-size-[165.1666717529297px_165.1666717529297px] bg-top-left h-[470px] left-[1567px] overflow-clip top-[904.5px] w-[991px]"
      data-name="CorpModuleIntroPhoto-M-NomeFileALTO"
      style={{
        backgroundImage: `url('${imgCorpModuleDisplaySNome}')`,
      }}
    >
      <AreaFocus3 />
      <AreaLoghiPremi3 />
    </div>
  );
}

function AreaLoghiPremi4() {
  return (
    <div
      className="-translate-x-1/2 absolute bg-[rgba(239,100,147,0.5)] bottom-[15px] h-[86px] left-1/2 w-[320px]"
      data-name="Area Loghi Premi"
    />
  );
}

function AreaFocus4() {
  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(0,71,187,0.5)] h-[400px] left-[calc(50%+162px)] overflow-clip top-1/2 w-[418px]"
      data-name="Area Focus"
    >
      <AreaLoghiPremi4 />
    </div>
  );
}

function AreaVelataTesto() {
  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#eedc00] h-[400px] left-[calc(50%-209px)] top-1/2 w-[324px]"
      data-name="Area Velata Testo"
    />
  );
}

function Group() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-1/2 top-1/2">
      <AreaFocus4 />
      <AreaVelataTesto />
    </div>
  );
}

function CorpModuleDisplayMNome() {
  return (
    <div
      className="absolute bg-size-[128px_128px] bg-top-left h-[400px] left-[3072px] overflow-clip top-[904.5px] w-[991px]"
      data-name="CorpModuleDisplay-M-Nome"
      style={{
        backgroundImage: `url('${imgCorpModuleDisplaySNome}')`,
      }}
    >
      <Group />
    </div>
  );
}

function AreaFocus5() {
  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(0,71,187,0.5)] h-[400px] left-[calc(50%+212px)] top-1/2 w-[552px]"
      data-name="Area Focus"
    />
  );
}

function AreaVelataTesto1() {
  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#eedc00] h-[400px] left-[calc(50%-363px)] top-1/2 w-[598px]"
      data-name="Area Velata Testo"
    />
  );
}

function Group1() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-[calc(50%-87px)] top-1/2">
      <AreaFocus5 />
      <AreaVelataTesto1 />
    </div>
  );
}

function AreaLoghiPremi5() {
  return (
    <div
      className="absolute bg-[rgba(239,100,147,0.5)] bottom-[20px] h-[108px] right-[387px] w-[408px]"
      data-name="Area Loghi Premi"
    />
  );
}

function CorpModuleDisplayLNome() {
  return (
    <div
      className="absolute bg-size-[128px_128px] bg-top-left h-[400px] left-[3072px] overflow-clip top-[1549.5px] w-[2000px]"
      data-name="CorpModuleDisplay-L-Nome"
      style={{
        backgroundImage: `url('${imgCorpModuleDisplaySNome}')`,
      }}
    >
      <Group1 />
      <AreaLoghiPremi5 />
    </div>
  );
}

function AreaFocus6() {
  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(0,71,187,0.5)] h-[470px] left-[calc(50%+212px)] top-1/2 w-[552px]"
      data-name="Area Focus"
    />
  );
}

function AreaVelataTesto2() {
  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#eedc00] h-[470px] left-[calc(50%-363px)] top-1/2 w-[598px]"
      data-name="Area Velata Testo"
    />
  );
}

function Group2() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-[calc(50%-87px)] top-1/2">
      <AreaFocus6 />
      <AreaVelataTesto2 />
    </div>
  );
}

function AreaLoghiPremi6() {
  return (
    <div
      className="absolute bg-[rgba(239,100,147,0.5)] bottom-[55px] h-[108px] right-[387px] w-[408px]"
      data-name="Area Loghi Premi"
    />
  );
}

function CorpModuleIntroPhotoLNomeFileAlto2X() {
  return (
    <div
      className="absolute bg-size-[128px_128px] bg-top-left h-[470px] left-[558px] overflow-clip top-[1549.5px] w-[2000px]"
      data-name="CorpModuleIntroPhoto-L-NomeFileALTO@2x"
      style={{
        backgroundImage: `url('${imgCorpModuleDisplaySNome}')`,
      }}
    >
      <Group2 />
      <AreaLoghiPremi6 />
    </div>
  );
}

function CorpBoxRackBadgeLoghiNome() {
  return (
    <div
      className="absolute bg-size-[128px_128px] bg-top-left h-[139px] left-[3072px] overflow-clip top-[2194.5px] w-[604px]"
      data-name="CorpBoxRack-BadgeLoghi-nome"
      style={{
        backgroundImage: `url('${imgCorpModuleDisplaySNome}')`,
      }}
    >
      <div className="-translate-y-1/2 absolute left-[305px] size-[129px] top-1/2">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 129 129"
        >
          <circle
            cx="64.5"
            cy="64.5"
            fill="var(--fill-0, #D9D9D9)"
            id="Ellipse 1"
            r="64.5"
          />
        </svg>
      </div>
      <div className="-translate-y-1/2 absolute left-[160px] size-[129px] top-1/2">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 129 129"
        >
          <circle
            cx="64.5"
            cy="64.5"
            fill="var(--fill-0, #D9D9D9)"
            id="Ellipse 1"
            r="64.5"
          />
        </svg>
      </div>
    </div>
  );
}

function CorpBoxRackBadgeLoghiNome1() {
  return (
    <div
      className="absolute bg-size-[128px_128px] bg-top-left h-[139px] left-[1954px] overflow-clip top-[2194.5px] w-[604px]"
      data-name="CorpBoxRack-BadgeLoghi-nome"
      style={{
        backgroundImage: `url('${imgCorpModuleDisplaySNome}')`,
      }}
    >
      <div className="-translate-y-1/2 absolute left-[305px] size-[129px] top-1/2">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 129 129"
        >
          <circle
            cx="64.5"
            cy="64.5"
            fill="var(--fill-0, #D9D9D9)"
            id="Ellipse 1"
            r="64.5"
          />
        </svg>
      </div>
      <div className="-translate-y-1/2 absolute left-[160px] size-[129px] top-1/2">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 129 129"
        >
          <circle
            cx="64.5"
            cy="64.5"
            fill="var(--fill-0, #D9D9D9)"
            id="Ellipse 1"
            r="64.5"
          />
        </svg>
      </div>
    </div>
  );
}

function CorpModuleIntroBoxSNome() {
  return (
    <div
      className="absolute bg-size-[128px_128px] bg-top-left h-[309px] left-[3072px] top-[2529.5px] w-[535px]"
      data-name="CorpModuleIntroBox-S-nome"
      style={{
        backgroundImage: `url('${imgCorpModuleDisplaySNome}')`,
      }}
    />
  );
}

function CorpModuleIntroBoxSNome1() {
  return (
    <div
      className="absolute bg-size-[128px_128px] bg-top-left h-[309px] left-[3072px] top-[3018.5px] w-[720px]"
      data-name="CorpModuleIntroBox-S-nome"
      style={{
        backgroundImage: `url('${imgCorpModuleDisplaySNome}')`,
      }}
    />
  );
}

function CorpContentEvidenceNome() {
  return (
    <div
      className="absolute bg-size-[128px_128px] bg-top-left h-[358px] left-[558px] top-[4603.5px] w-[696px]"
      data-name="CorpContentEvidence-Nome-"
      style={{
        backgroundImage: `url('${imgCorpModuleDisplaySNome}')`,
      }}
    />
  );
}

function CorpCardSimpleReactiveNome() {
  return (
    <div
      className="absolute bg-size-[128px_128px] bg-top-left h-[358px] left-[558px] top-[5264.5px] w-[636px]"
      data-name="CorpCardSimpleReactive-Nome-"
      style={{
        backgroundImage: `url('${imgCorpModuleDisplaySNome}')`,
      }}
    />
  );
}

function AreaFocus7() {
  return (
    <div
      className="-translate-x-1/2 absolute bg-[rgba(0,71,187,0.5)] h-[324px] left-1/2 top-0 w-[450px]"
      data-name="Area Focus"
    />
  );
}

function CorpCardPortrait9X10Nome() {
  return (
    <div
      className="absolute bg-size-[64px_64px] bg-top-left h-[500px] left-[558px] overflow-clip top-[6207.5px] w-[450px]"
      data-name="CorpCardPortrait9x10-Nome-"
      style={{
        backgroundImage: `url('${imgCorpModuleDisplaySNome}')`,
      }}
    >
      <AreaFocus7 />
    </div>
  );
}

function AreaFocus8() {
  return (
    <div
      className="-translate-x-1/2 absolute bg-[rgba(0,71,187,0.5)] h-[341px] left-1/2 top-0 w-[400px]"
      data-name="Area Focus"
    />
  );
}

function CorpCardPortrait4X5Nome() {
  return (
    <div
      className="absolute bg-size-[64px_64px] bg-top-left h-[500px] left-[1181.5px] overflow-clip top-[6207.5px] w-[400px]"
      data-name="CorpCardPortrait4x5-Nome-"
      style={{
        backgroundImage: `url('${imgCorpModuleDisplaySNome}')`,
      }}
    >
      <AreaFocus8 />
    </div>
  );
}

function AreaFocus9() {
  return (
    <div
      className="-translate-x-1/2 absolute bg-[rgba(0,71,187,0.5)] h-[452px] left-1/2 top-0 w-[400px]"
      data-name="Area Focus"
    />
  );
}

function CorpCardPortrait2X3Nome() {
  return (
    <div
      className="absolute bg-size-[64px_64px] bg-top-left h-[600px] left-[1718.5px] overflow-clip top-[6207.5px] w-[400px]"
      data-name="CorpCardPortrait2x3-Nome-"
      style={{
        backgroundImage: `url('${imgCorpModuleDisplaySNome}')`,
      }}
    >
      <AreaFocus9 />
    </div>
  );
}

function AreaFocus10() {
  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(0,71,187,0.5)] h-[390px] left-[calc(50%-129.5px)] top-1/2 w-[653px]"
      data-name="Area Focus"
    />
  );
}

function CorpModuleIntroBoxLNome() {
  return (
    <div
      className="absolute bg-size-[64px_64px] bg-top-left h-[390px] left-[3072px] overflow-clip top-[3568.5px] w-[912px]"
      data-name="CorpModuleIntroBox-L-nome"
      style={{
        backgroundImage: `url('${imgCorpModuleDisplaySNome}')`,
      }}
    >
      <AreaFocus10 />
    </div>
  );
}

function AreaFocus11() {
  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(0,71,187,0.5)] h-[400px] left-[calc(50%-0.25px)] top-1/2 w-[334px]"
      data-name="Area Focus"
    />
  );
}

function CorpVisualMultiNome() {
  return (
    <div
      className="absolute bg-size-[128px_128px] bg-top-left h-[400px] left-[558px] overflow-clip top-[2751.5px] w-[864px]"
      data-name="CorpVisualMulti-nome-"
      style={{
        backgroundImage: `url('${imgCorpModuleDisplaySNome}')`,
      }}
    >
      <AreaFocus11 />
    </div>
  );
}

function AreaFocus12() {
  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(0,71,187,0.5)] h-[242px] left-1/2 top-1/2 w-[469px]"
      data-name="Area Focus"
    />
  );
}

function CorpVisualMinimalNome() {
  return (
    <div
      className="absolute bg-size-[64px_64px] bg-top-left h-[400px] left-[558px] overflow-clip top-[3558.5px] w-[1728px]"
      data-name="CorpVisualMinimal-nome-"
      style={{
        backgroundImage: `url('${imgCorpModuleDisplaySNome}')`,
      }}
    >
      <AreaFocus12 />
    </div>
  );
}

export default function Asset() {
  return (
    <div
      className="bg-white relative size-full"
      data-name="asset"
    >
      <CorpModuleDisplaySNome />
      <CorpCardPictureNome />
      <CorpIntroPhotoSNome />
      <CorpModuleIntroPhotoMNomeFileAlto />
      <CorpModuleDisplayMNome />
      <CorpModuleDisplayLNome />
      <CorpModuleIntroPhotoLNomeFileAlto2X />
      <CorpBoxRackBadgeLoghiNome />
      <CorpBoxRackBadgeLoghiNome1 />
      <CorpModuleIntroBoxSNome />
      <CorpModuleIntroBoxSNome1 />
      <CorpContentEvidenceNome />
      <CorpCardSimpleReactiveNome />
      <CorpCardPortrait9X10Nome />
      <CorpCardPortrait4X5Nome />
      <CorpCardPortrait2X3Nome />
      <CorpModuleIntroBoxLNome />
      <CorpVisualMultiNome />
      <CorpVisualMinimalNome />
    </div>
  );
}