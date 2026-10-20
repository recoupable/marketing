package recoupable

import "context"

// AccountIdentity is the documented successful GET /api/accounts/id response.
type AccountIdentity struct {
	Status    string `json:"status"`
	AccountID string `json:"accountId"`
}

// GetAccountID identifies the account associated with the supplied credentials.
func (c *Client) GetAccountID(ctx context.Context) (AccountIdentity, error) {
	var result AccountIdentity
	if err := c.Request(ctx, "GET", "/api/accounts/id", nil, nil, &result); err != nil {
		return AccountIdentity{}, err
	}
	if result.Status != "success" || result.AccountID == "" {
		return AccountIdentity{}, ErrInvalidResponse
	}
	return result, nil
}
