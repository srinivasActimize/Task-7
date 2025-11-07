import { DNA } from 'react-loader-spinner';

export function Loader() {
  return (
    <div className='d-flex justify-content-center mt-5 pt-5'>
    <DNA
visible={true}
height="80"
width="80"
ariaLabel="dna-loading"
wrapperStyle={{}}
wrapperClass="dna-wrapper"
/>
</div>
  )
}