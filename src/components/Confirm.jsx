import React from 'react'

function Confirm() {
  return (
    <div>
      <div class="modal" tabindex="-1" id='confirm'>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Confirm delete</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Do you want to delete this employee data</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Confirm</button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Confirm
